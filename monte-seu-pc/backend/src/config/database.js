const mongoose = require("mongoose");

const connectDatabase = () => {
    return mongoose.connect(process.env.MONGO_URI);
};

module.exports = connectDatabase;
