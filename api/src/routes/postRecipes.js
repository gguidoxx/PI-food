const { Router } = require("express");
const { Recipe, Diets } = require("../db");
const router = Router();

// router.post("/recipes", async (req, res, next) => {
//   let { title, summary, image, createdInDb, dieta } = req.body;
//   if (!title || !summary) {
//     return res.status(400).send("Por favor, coloque un titulo y un resumen.");
//   }
//   console.log(title);
//     let createRecipe = await Recipe.create({
//       title,
//       summary,
//       image,
//       dieta,
//       createdInDb,
//     });
//     let dietsDb = await Diets.findAll({ where: { name: Diets } });
//     createRecipe.addDiets(dietsDb);
//     res.status(200).send("Se creó su receta correctamente.");

// });
router.post("/recipes", async (req, res) => {
  let { title, summary, image, dieta, createdInDb } = req.body;
  let createRecipe = await Recipe.create({
    title,
    summary,
    image,
    dieta,
    createdInDb,
  });

  let dietDb = await Diets.findAll({
    where: { title: dieta },
  });

  createRecipe.addDiets(dietDb);
  res.send("Receta creada correctamente.");
});

module.exports = router;
