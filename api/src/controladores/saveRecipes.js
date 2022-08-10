const axios = require("axios");
const { Recipe, Diets } = require("../db");
const { API_KEY } = process.env;
const {Sequelize} = require('sequelize');

// ME TRAIGO TODA LA DATA DE LA API, MAPEADA POR SOLO LOS ATRIBUTOS QUE NECESITO O ME INTERESAN
const getApiInfo = async () => {
  const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`)
   const apiInfo = await apiUrl.data.results.map(e =>{
       return {
           id: e.id, 
           title: e.title,
           image: e.image,
           summary: e.summary,            // Resumen del plato.
           Diets: e.diets.map((d)=> d), // un array con los tipos de dieta de esa recet
           stepByStep : e.analyzedInstructions
          }
          
   })
  return apiInfo
}

//TRAIGO TODA LA DATA QUE HAY EN MI BASE DE DATOS
const getDbInfo = async () => {
  return await Recipe.findAll({
    include: {
      model: Diets,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

// JUNTO LA DATA DE LA API, Y LA DATA DE MI BASE DE DATOS EN UNA SOLA CONSTANTE.

const getAllRecipes = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const allRecipes = [...apiInfo, ...dbInfo];
  return allRecipes;
};
const getAallRecipes = async (req, res) =>{
  const { name } = req.query; 
  // Si no hay ?name= en la URL entra al siguiente if
  if (!name) {
    try {
      //Intento traer todas las recetas que vengan por API y por DB
      const recipeApiInfo = await getApiInfo(); 
      const recipeBD = await Recipe.findAll({
        //Que incluya el modelo "diets" con la propiedad "name"
        include: {
          model: Diets, 
          attributes: ["name"], 
          through: {
            attributes: [],
          },
        },
      });
      return res.send(await Promise.all([...recipeApiInfo, ...recipeBD])); // Una vez terminado todo el proceso, concatena todo lo que recibió
    } catch (err) {
      res.json({ err });
      console.error(err);
    }
    // En caso de tener un nombre por query, entra al else.
  } else {
   // ¡¡¡HAY QUE PASAR TODO A LOWERCASE PARA QUE PASE POR EL FILTRADO SIN PROBLEMAS!!!
    try {
      const recipeApiInfo = await getApiInfo();
      const recipeApi = recipeApiInfo.filter((e) => {
        if (e.title.toLowerCase().includes(name.toLowerCase())) {
          // si el titulo de la receta que traigo desde la api , incluye el nombre que me pasaron por params
          return e; // va a retornarlo dentro del array del filter
        }
      });

      const recipeBD = await Recipe.findAll({
        // los mismo que lo anterior, pero ahora desde la DB
        where: {
          //Filtro el título para que me traiga todas las recetas que contengan lo enviado por query.
          title: { [Sequelize.Op.like]: `%${name.toLowerCase()}%` }, 
        }, 
        include: {
          model: Diets,
          attributes: ["name"], 
          through: {
            attributes: [],
          },
        },
      });
      const respuesta = await Promise.all(recipeBD.concat(recipeApi)); // Concateno todo luego de que terminen las promesas.
      //Si la receta(?name=) pasada por query no está en la API, y tampoco fue creada por base de datos, devuelvo un 404 avisando que no hay receta.
      if (respuesta.length === 0) {res.send('No se encontró la receta deseada. ¡Pruebe inventando una!'); }
      else{
        return res.send(respuesta); 
      }
    } catch (err) {
      res.json({ err });
    }
  }
}

module.exports = {
  getAllRecipes,
  getDbInfo,
  getApiInfo,
  getAallRecipes,
};
