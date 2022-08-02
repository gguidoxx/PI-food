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
  const { id } = req.params;

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
        let recipeId = allRecipes.filter((el) => el.id === parseInt(id));
        // console.log(recipeId);
        recipeId.length
          ? res.status(200).send(recipeId)
          : res.status(400).send('No se encontró la receta deseada. ¡Pruebe inventando una!');
      }
    } catch (err) {
      res.json({ message: err });
    }
  }
});

module.exports = router;
