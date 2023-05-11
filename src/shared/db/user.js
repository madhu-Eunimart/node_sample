import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username: {
      type:String,
      unique: true,
      required:true,
  
    },
    password : {
      type:String,
      required:true
    },
    id : {type:String},
    otp : {type:String},
    usertype:{type:String,default:'buyer'}
  },
  {_id: true,timestamps:true}
)

// UserSchema.index({userId:1,createdAt: -1})

const User= mongoose.model('user',UserSchema,"user");

export default  User;