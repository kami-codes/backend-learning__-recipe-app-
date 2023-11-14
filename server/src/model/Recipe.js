import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingridents: [{ type: String, requried: true }],
  instruction: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  cookingTime: {
    type: Number,
    required: true,
  },
  userOwner:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users"
  }
});

export const RecipeModel = mongoose.model("recipe", RecipeSchema);
