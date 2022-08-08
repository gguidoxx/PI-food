const { Router } = require("express");
const router = Router();
const axios = require("axios");
const {
  getAllRecipes,
  getDbInfo,
  getRecipes,
  getAallRecipes,
} = require("../controladores/saveRecipes");
const { Recipe, Diets } = require("../db");

router.get("/", getAallRecipes);

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const allRecipes = await getAllRecipes();

  let validateDb = id.includes("-"); // Las recetas de API no tienen guiones en ella. Por ende, si tiene guión, es de base de datos.

  if (validateDb) {
    try {
      let dataBaseId = await Recipe.findByPk(id, { include: Diets }); //
      res.status(200).json([dataBaseId]);
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      if (id) {
        let recipeId = allRecipes.filter((el) => el.id == id);
        // console.log(recipeId);
        recipeId.length
          ? res.status(200).send(recipeId)
          : res
              .status(400)
              .send(
                `No se encontró la receta con el id ${id}. ¡Pruebe inventando una!`
              );
      }
    } catch (err) {
      
    }
  }
});

// router.get("/:id", async (req, res) => {
//   let id = req.params.id;
//   let allRecipes = await getAllRecipes();
//   if (id) {
//     let recipeId = await allRecipes.filter((e) => e.id == id);
//     recipeId.length
//       ? res.status(200).send(recipeId)
//       : res.status(400).send("No se encontró la receta.");
//   }
// });

module.exports = router;
