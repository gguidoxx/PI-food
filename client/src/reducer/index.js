export const initialState = {
  recipes: [],
  allRecipes: [],
  details: [],
  diets: [],
  
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload, // PARA QUE ME GUARDE SIEMPRE TODOS LOS PERSONAJES, Y NUNCA LA MODIFICO LUEGO
      };

    case "GET_BY_NAME":
      return {
        ...state,
        recipes: action.payload,
      };

    case "GET_BY_ID":
      return {
        ...state,
        details: action.payload,
      };
    case "FILTER_BY_DIET":
      const allRecipe = state.allRecipes;
      // const allRec = state.recipes
    

      const typeDietFilter =
        action.payload === "All"
          ? allRecipe
          : allRecipe.filter((t) =>
              t.diets.find((e) => e.name === action.payload)
            );
      console.log(action.payload);

      return {
        ...state,
        recipes: typeDietFilter,
      };
    case "ORDER_BY_NAME":
      let order =
        action.payload === "asc"
          ? state.recipes.sort(function (a, b) {
              if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
              }
              if (b.title.toLowerCase() > a.title.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return -1;
              }
              if (b.title.toLowerCase() > a.title.toLowerCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: order,
      };

    case "ORDER_BY_PUNTUATION":
      let orderpunt =
        action.payload === "menormayor"
          ? state.recipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return 1;
              }
              if (b.healthScore > a.healthScore) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return -1;
              }
              if (b.healthScore > a.healthScore) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: orderpunt,
      };

    case "POST_RECIPE":
      return {
        ...state,
      };

    case "GET_DIETS":
      return {
        ...state,
        diets: action.payload,
      };
      case "CLEAR_STATE":
      return{
        ...initialState,
      }
    case "FILTER_CREATED":

    const filteredRecipes = action.payload === "created" ? state.allRecipes.filter((e) => e.createdInDb) : state.allRecipes.filter((e) => !e.createdInDb)
      
   

    default:
      return state;
  }
}

export default rootReducer;
    