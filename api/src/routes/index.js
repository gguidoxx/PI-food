const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=5acc3c7336f94055a09b48c19cf868b7').then((respuesta) => {
    console.log(respuesta.data.results)
}).catch(()=>{
    console.log('No arrancó')
})



module.exports = router;
