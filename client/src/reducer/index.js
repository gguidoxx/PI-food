export const initialState = {
  recipes: [],
  allRecipes: [],
  details: [],
  diets: [],
};

function rootReducer(initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
  }
}

export default rootReducer;
