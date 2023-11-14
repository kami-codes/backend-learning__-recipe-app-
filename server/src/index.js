import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';

import {userRouter } from './routes/users.js'
import { recipeRouter } from "./routes/recipes.js";

const app = express();

app.use(express.json())

app.use(cors())

app.use("/auth", userRouter)
app.use("/recipe", recipeRouter)


mongoose.connect("mongodb+srv://devsharmasoe:lt4JfhUzhgKgpk9f@cluster0.pahz4df.mongodb.net/pedroRecipe?retryWrites=true&w=majority").then(()=> console.log("DB connected"))

app.listen(3500, ()=>{
    console.log("server is running happily 😀")
})