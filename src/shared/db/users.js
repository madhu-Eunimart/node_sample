import mongoose from "mongoose";


const UsersSchema = new mongoose.Schema({
    id: {type: String},
    details: {type: Object}
},
{ _id: true, timestamps: true }
);


const Users = mongoose.model('users', UsersSchema, "users");

export default Users;