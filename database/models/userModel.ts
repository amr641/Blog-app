import { Schema, model } from "mongoose";

const userSchema = new Schema ({
name:String, 
email:String, 
password:String, 
avatar:String,
bio:String,
prefernces:String,
changedPassword:{
    type:Boolean,
    default:false
},
status:{
    type:Boolean,
    default:false
}

})
userSchema.post('find', function (doc) {
    let url = "localhost:3000/uploads/user";
    doc.avatar = url + doc.avatar;
})

export const User =model("User",userSchema)