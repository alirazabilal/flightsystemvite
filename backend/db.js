const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://alirazabilal:ali123@cluster0.90k6oio.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToMongo;
