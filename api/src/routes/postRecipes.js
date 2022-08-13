const { Router } = require("express");
const { Recipe, Diets } = require("../db");
const router = Router();

router.post("/", async (req, res, next) => {
let {title, summary, image, diets, analyzedInstructions, createdInDb} = req.body
if (!title) {
  res.status(400).send('Por favor inserte un nombre a su receta.')
}
if (!summary) {
  res.status(400).send('¿De que trata su receta? Coloque un resumen por favor.')
}

try {
  let createRecipe = await Recipe.create({
    title, summary, image, diets, analyzedInstructions
  })
  let tipoDieta = await Diets.findAll({where: {name: diets}})
  createRecipe.addDiets(tipoDieta)
  res.status(200).send('Su receta fue creada correctamente.')
} catch (error) {
  next(error)
}

});

module.exports = router;
