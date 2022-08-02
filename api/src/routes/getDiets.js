const { Router } = require("express");
const router = Router();
const { Diets } = require("../db");
const { dietas } = require("../controladores/dietas");

router.get("/", async (req, res) => {
  dietas.forEach((e) => {
    Diets.findOrCreate({
      where: { name: e.name },
    });
  });

  const allDiets = await Diets.findAll();
  res.send(allDiets.map((e) => e.name));
});

module.exports = router;
