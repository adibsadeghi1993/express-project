const { default: mongoose } = require("mongoose");

const connectToMongoDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/contact")
    .then(() => console.log("data base connected"))
    .catch(() => {
      console.log("database not connected");
    });
};

module.exports = connectToMongoDB;
