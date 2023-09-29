const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
    image: { type: "String", required: true },
    selectedUser: { type: "String", required: true },
    description: { type: "String", required: true },
    selectedUserName: { type: "String", required: true },
  },
  {
    timestapms: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
