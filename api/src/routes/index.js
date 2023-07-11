const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getRecipes = require("./getRecipes");
const getDiets = require("./getDiets");
const createRecipe = require("./postRecipes");


const router = Router();

router.use("/recipes", getRecipes);
router.use("/recipes", createRecipe);
router.use("/diets", getDiets);



module.exports = router;
