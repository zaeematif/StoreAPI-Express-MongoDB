require("dotenv").config();

//async errors
require('express-async-errors');

const express = require("express");
const notFoundMiddleware = require("./middleware/not-found");
const connectDB = require("./db/connect");
const errorHandlerMiddleware = require("./middleware/error-handler");
const productRouter = require("./routes/products");

//initalizing our express app
const app = express();

// MIDDLEWARE
app.use(express.json());

//route
app.get("/", (req, res) => {
    res.send(
        "<h1>WELCOME TO STORE API</h1> <p>Go to API page: <a href='/api/v1/products'>Products List</a> </p>"
    );
});

app.use('/api/v1/products', productRouter)

//MIDDLE WARE
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  const port = process.env.PORT || 5500;

  try {
    //connect with DB
    const connection = await connectDB(process.env.MONGODB_URI);

    app.listen(port, () => {
      console.log(`Server is listning at ${port}`);
    });
  } catch (error) {
    console.log("DB connection Error: ", error);
  }
};

start();
