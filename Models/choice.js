const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const choiceSchema = new Schema(
  {
    poll: {
      type: mongoose.ObjectId,
    },
    name: {
      type: String,
      required: true,
    },
    votes: {
      type: [mongoose.ObjectId],
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Choice", choiceSchema);
