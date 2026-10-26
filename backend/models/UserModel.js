const { Schema, model } = require('mongoose');
const mySchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  city: {type:String,required:true},
}, { timestamps: true });

module.exports = model("users", mySchema);
