require("dotenv").config();
const express = require("express");
const router = require("./routes/v1/index");
const swaggerJSON = require("./swagger.json");
const swaggerUI = require("swagger-ui-express");

const app = express();

//middleware
app.use(express.json());

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));

//routes
app.use('/api/v1/', router)

module.exports = app;

