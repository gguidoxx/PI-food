const { Router } = require("express");
const router = Router();
const { Diets } = require("../db");
const { diets } = require("../controladores/dietas");


router.get("/", async (req, res) => {
  //console.log(diets);
  diets.forEach((e) => {
    Diets.findOrCreate({
      where: { name: e.name },
    });
  });

  const allTheTypes = await Diets.findAll();
  res.send(allTheTypes.map((e) => e.name));
});

module.exports = router;
