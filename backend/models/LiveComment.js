const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  userId: {
    type: String,
    require: true,
  },
  itemId: {
    type: String,
    require: true,
  },
  Comment: {
    type: String,
    require: true,
  },
});

const Comments = mongoose.model("Comments", commentSchema);

module.exports = Comments;
