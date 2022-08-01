const { Router } = require("express");
const router = Router();
const axios = require("axios");
const {
  getAllRecipes,
  getAallRecipes,
} = require("../controladores/saveRecipes");
const { Recipe, TypeDiet } = require("../db");

router.get("/recipes", getAallRecipes);
router.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  const allRecipes = await getAllRecipes();
  // console.log(allRecipes.map(e => e.id===parseInt(id)));
  let validate = id.includes("-"); // si tiene el guion es porque se encuentra en la base de datos

  if (validate) {
    try {
      let dbId = await Recipe.findByPk(id, { include: TypeDiet }); // entonce la busco directo de la base de datos
      res.status(200).json([dbId]);
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      if (id) {
        let recipeId = await allRecipes.filter((el) => el.id === parseInt(id));
        // console.log(recipeId);
        recipeId.length
          ? res.status(200).send(recipeId)
          : res
              .status(400)
              .send(
                `No existe una receta con el ID ${id}, prueba buscarla por su nombre.`
              );
      }
    } catch (err) {
      res.json({ message: err });
    }
  }
});

module.exports = router;
