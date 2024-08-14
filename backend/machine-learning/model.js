const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");
const path = require("path");

// Cargar los datos de entrenamiento desde el archivo JSON
const trainingDataPath = path.join(__dirname, "trainingData.json");
const rawData = fs.readFileSync(trainingDataPath);
const data = JSON.parse(rawData);

// Convertir los datos en tensores para TensorFlow
const inputArray = [];
const outputArray = [];

data.forEach((item) => {
  // Validar que bloodPressure esté definido y tenga el formato esperado
  if (item.bloodPressure && item.bloodPressure.includes("/")) {
    // Extraer la presión arterial sistólica (primer número)
    const systolicBP = parseInt(item.bloodPressure.split("/")[0]);

    // Preparar las características de entrada
    inputArray.push([
      item.temperature,
      item.heartRate,
      systolicBP,
      item.respiratoryRate,
    ]);

    // Preparar las etiquetas de salida
    outputArray.push(item.conditions);
  } else {
    console.error(
      `Invalid bloodPressure format in data: ${JSON.stringify(item)}`
    );
  }
});

// Crear tensores a partir de los arrays
if (inputArray.length > 0 && outputArray.length > 0) {
  const inputTensor = tf.tensor2d(inputArray);
  const outputTensor = tf.tensor2d(outputArray);

  // Definir el modelo
  const model = tf.sequential();
  model.add(
    tf.layers.dense({ units: 32, inputShape: [4], activation: "relu" })
  );
  model.add(tf.layers.dropout({ rate: 0.2 }));
  model.add(tf.layers.dense({ units: 16, activation: "relu" }));
  model.add(tf.layers.dropout({ rate: 0.2 }));
  model.add(tf.layers.dense({ units: 4, activation: "sigmoid" }));
  model.compile({ optimizer: "adam", loss: "binaryCrossentropy" });

  // Entrenar el modelo
  (async () => {
    console.log("Training the model...");
    await model.fit(inputTensor, outputTensor, {
      epochs: 100,
      callbacks: {
        onEpochEnd: (epoch, log) =>
          console.log(`Epoch ${epoch + 1} / 100, Loss: ${log.loss}`),
      },
    });

    // Guardar el modelo
    const savePath = path.join(__dirname, "saved-model");
    await model.save(`file://${savePath}`);
    console.log("Model trained and saved successfully.");
  })();
} else {
  console.error("No valid data available for training.");
}
