const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
//create tour modal
const adminSchema = mongoose.Schema(
  {
    userName: { type: "String", required: true },
    password: { type: "String", required: true }
   
  },
  {
    timestapms: true,
  }
);

adminSchema.methods.matchPassword = async function (enteredPassword) {
  //compare user give password encrypted password
  return await bcrypt.compare(enteredPassword, this.password);
};

adminSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  } else {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});


const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
