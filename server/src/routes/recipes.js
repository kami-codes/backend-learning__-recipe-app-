import { RecipeModel } from "../model/Recipe.js";
import express from "express";
import mongoose from "mongoose";
import { UserModel } from "../model/User.js";
import jwt from "jsonwebtoken"

const router = express.Router();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, "SECERET", (err) => {
      console.log(err)
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

router.get("/", async (req, res) => {
  try {
    const response = await RecipeModel.find({});
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

router.post("/", async (req, res) => {
  const recipe = new RecipeModel({
    ...req.body,
  });
  try {
    const response = recipe.save();
    res.json(recipe);
  } catch (error) {
    res.json(error);
  }
});
router.put("/", async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeId);
    const user = await UserModel.findById(req.body.userId);
    user.savedRecipes.push(recipe);
    await user.save();

    res.json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    res.json(error);
  }
});

router.post("/savedRecipes/ids",verifyToken, async(req, res)=>{
  console.log(req.body)
    try {
        const user = await UserModel.findById(req.body.userId)

        res.json(user.savedRecipes)
    } catch (error) {
        res.json({error: error})
    }
})

router.get("/savedRecipes/:userId", verifyToken ,async(req, res)=>{
    try {
        const user = await UserModel.findById(req.params.userId)
        console.log(req.body.userId)
        const savedRecipes = await RecipeModel.find({
            _id: {$in: user.savedRecipes},
        })
        res.json({savedRecipes})
    } catch (error) {
      console.log(error)
        res.json({error: error})
    }
})

export { router as recipeRouter };
