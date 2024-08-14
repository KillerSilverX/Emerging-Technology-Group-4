const tf = require("@tensorflow/tfjs-node");
const VitalSigns = require("../models/VitalSigns");

exports.addVitalSigns = async (req, res) => {
  try {
    const {
      patientId,
      nurseId,
      temperature,
      heartRate,
      bloodPressure,
      respiratoryRate,
    } = req.body;

    const systolicBP = parseInt(bloodPressure.split("/")[0]);
    const diastolicBP = parseInt(bloodPressure.split("/")[1]);
    const parsedTemperature = parseFloat(temperature);
    const parsedHeartRate = parseInt(heartRate);
    const parsedRespiratoryRate = parseInt(respiratoryRate);

    if (
      isNaN(parsedTemperature) ||
      isNaN(parsedHeartRate) ||
      isNaN(systolicBP) ||
      isNaN(diastolicBP) ||
      isNaN(parsedRespiratoryRate)
    ) {
      return res
        .status(400)
        .json({
          error: "Invalid input. Please ensure all values are numbers.",
        });
    }

    const vitalSigns = new VitalSigns({
      patientId,
      nurseId,
      temperature: parsedTemperature,
      heartRate: parsedHeartRate,
      bloodPressure,
      respiratoryRate: parsedRespiratoryRate,
    });

    await vitalSigns.save();

    // Cargar el modelo desde el servidor
    const model = req.app.get("model");
    const vitalSignsInput = tf.tensor2d(
      [[parsedTemperature, parsedHeartRate, systolicBP, parsedRespiratoryRate]],
      [1, 4]
    );

    const prediction = model.predict(vitalSignsInput);
    const predictedConditions = prediction.dataSync();

    const conditions = new Set();

    // Verificación manual adicional para etiquetas correctas
    if (parsedTemperature >= 38) conditions.add("Fever - Requires Review");
    if (parsedHeartRate > 100) conditions.add("Tachycardia - Requires Review");
    if (systolicBP >= 140 || diastolicBP >= 90)
      conditions.add("Hypertension - Requires Review");
    if (parsedRespiratoryRate > 20)
      conditions.add("Tachypnea - Requires Review");

    // Si ninguna condición es identificada por la lógica o el modelo
    if (conditions.size === 0) {
      conditions.add("Normal");
    }

    vitalSigns.conditions = Array.from(conditions);
    await vitalSigns.save();

    res.status(201).json({ vitalSigns, conditions: Array.from(conditions) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getVitalSignsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const vitalSigns = await VitalSigns.find({ patientId })
      .populate("nurseId", "name")
      .sort({ visitDate: -1 });
    res.status(200).json(vitalSigns);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
