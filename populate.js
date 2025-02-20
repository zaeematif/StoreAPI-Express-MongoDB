require('dotenv').config()
console.log("IN populate.js");

const connectDB = require('./db/connect')
const Product = require('./models/product')
const jsonProducts = require('./products.json')

const connect = async () => {
    try {
        const connection = await connectDB(process.env.MONGODB_URI)
        console.log("DB CONNECTED");

        await Product.deleteMany();
        await Product.create(jsonProducts)

        //0 - if no error
        process.exit(0)
    } catch (error) {
        console.log("DB CONNECTION FAILED: ", error);
        process.exit(1); //1 - if error
    }
}

connect();




