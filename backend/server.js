// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schemas/schema");
const routes = require("./routes/index");
const tf = require("@tensorflow/tfjs-node-gpu");
const path = require("path");

const app = express();

mongoose.set("strictQuery", false);

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api", routes); // Add this line for RESTful routes

// GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Load and use the trained model
let loadedModel;

(async () => {
  try {
    loadedModel = await tf.loadLayersModel(
      "file://machine-learning/saved-model/model.json"
    );
    app.set("model", loadedModel); // Attach the loaded model to the app

    // Connect to MongoDB and start the server only after the model is loaded
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error loading model or connecting to MongoDB:", error);
  }
})();
