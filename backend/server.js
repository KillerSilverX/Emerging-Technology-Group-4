// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schemas/schema');
const routes = require('./routes/index');
const app = express();

mongoose.set('strictQuery', false);

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api', routes); // Add this line for RESTful routes

// GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});
