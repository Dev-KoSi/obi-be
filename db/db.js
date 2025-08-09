const mongoose = require("mongoose");

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URl);

        console.log("MongoDB is connected successfully!!");
        
    } catch (error) {
        console.log("Connection to DB failed!!")
    }
}

module.exports = connectToDB;