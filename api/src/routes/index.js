const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {Recipe, Diets} = require('../db');
const e = require('express');
const {
    API_KEY
  } = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// PROMESAS
// axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=5acc3c7336f94055a09b48c19cf868b7').then((respuesta) => {
//     console.log(respuesta.data.results)
// }).catch(()=>{
//     console.log('No arrancó')
// })

//ASYNC AWAIT
const getRecipes = async () => {
    const apiUrl = await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=5acc3c7336f94055a09b48c19cf868b7')
    const apiInfo = await apiUrl.data.results.map(e => {
        return {
            id: e.id,
            title: e.title,
            img: e.image,
        }
    })
    return apiInfo;
}

const getDbInfo = async () => {
    return await Recipe.findAll()
}

const getAllRecipes = async () =>{
    const apiInfo = await getRecipes();
    const db = await getDbInfo();
    const total = apiInfo.concat(db);
    return total;
}


router.get('/recipes', async (req,res) =>{
    const title = req.query.name
    let totalRecipes = await getAllRecipes()
    if(title){
        let recipesTitle = await totalRecipes.filter(e => e.title.toLowerCase().includes(title.toLowerCase()))
        if (recipesTitle.length) {
                res.status(200).send(recipesTitle)
                
        } else {
                res.status(404).send('No se encontró la receta buscada. :(')
        }
    }else{
        res.status(200).send(totalRecipes)
    }
})


module.exports = router;
