const mongoose = require ('mongoose');

const user = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  institution: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  roles:{
    type: Array,
    required : true,
    default: ["ROLE_MODERATOR"]
  },
  firstName:{
    type: String,
    required: true
  },
  status: {
      type: String,
      enum: ['Pending', 'Active'],
      default: 'Pending'
    },
    confirmationCode: {
      type: String,
      unique: true 
    },
  
    resetToken : {
      type:String,
      default: ""
    }
});

module.exports = User = mongoose.model("Users", user);
