require("dotenv").config();
const express = require("express");
const router = require("./routes/v1/index");

const app = express();

//middleware
app.use(express.json());

//routes
app.use('/api/v1/', router)

//running
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
