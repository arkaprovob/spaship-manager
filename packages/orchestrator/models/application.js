const mongoose = require("mongoose");
//Deperecated
const ApplicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    path: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    userId: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Application", ApplicationSchema);
