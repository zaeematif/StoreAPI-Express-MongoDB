const mongoose = require('mongoose')

const connectDB = (uri) => {
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true, // Fix deprecation warning
    })
}

module.exports = connectDB;
