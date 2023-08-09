const mongoose = require("mongoose");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const userSchema =  mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timeStamp: true,
  }
);

userSchema.pre('save', async function (next){
    if(!this.isModified("password")){
      next()
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPasswords=async function(password){
  return await bcrypt.compare(password,this.password);
}

userSchema.methods.getSignedToken= function (){
  return jwt.sign({id:this._id}, process.env.JWT_SECRET, {
    expiresIn:'1h'
  })
}

const users = mongoose.model("user", userSchema);
module.exports = users;
