const axios = require("axios");
const { Recipe, Diets } = require("../db");
const { API_KEY } = process.env;


// ME TRAIGO TODA LA DATA DE LA API, MAPEADA POR SOLO LOS ATRIBUTOS QUE NECESITO O ME INTERESAN
const getRecipes = async () => {
    const apiUrl = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
    );
    const apiInfo = await apiUrl.data.results.map((e) => {
      return {
        id: e.id,
        title: e.title,
        img: e.image,
      };
    });
    return apiInfo;
  };
  
  //TRAIGO TODA LA DATA QUE HAY EN MI BASE DE DATOS
  const getDbInfo = async () => {
    return await Recipe.findAll({
        include : {
            model : Diets,
            attributes : ['name'],
            through: {
                attributes:[]
            }
        }
    })
}
  
  // JUNTO LA DATA DE LA API, Y LA DATA DE MI BASE DE DATOS EN UNA SOLA CONSTANTE.
  const getAllRecipes = async () => {
    const apiInfo = await getRecipes();
    const db = await getDbInfo();
    const total = apiInfo.concat(db);
    return total;
  };
  
  module.exports={
    getAllRecipes,
    getDbInfo,
    getRecipes,
  }