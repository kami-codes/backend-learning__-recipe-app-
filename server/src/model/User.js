import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
userName : {
    type: String,
    required: true,
    unique: true,
},
password: {
    type: String,
    required: true,
},
savedRecipes: [{type: mongoose.Schema.Types.ObjectId, ref: "recipe", default: []}]
})

export const UserModel = mongoose.model("users", UserSchema)