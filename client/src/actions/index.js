import axios from "axios";

const GET_RECIPES = "GET_RECIPES";
const FILTER_BY_DIET = "FILTER_BY_DIET";
const ORDER_BY_NAME = "ORDER_BY_NAME";
const ORDER_BY_PUNTUATION = "ORDER_BY_PUNTUATION";
const GET_BY_NAME = "GET_BY_NAME";
const GET_BY_ID = "GET_BY_ID";
const GET_DIETS = "GET_DIETS";
const PUT_RECIPE = "PUT_RECIPE";
const CLEAR_STATE = "CLEAR_STATE";
const FILTER_CREATED= "FILTER_CREATED"

process.env.REACT_APP_URL_API
export function getRecipes() {
  return async function (dispatch) {
    var json = await axios.get(`${process.env.REACT_APP_URL_API}/recipes`);
    return dispatch({
      type: GET_RECIPES,
      payload: json.data,
    });
  };
}
export function clearState() {
  return {
    type: CLEAR_STATE,
  };
}

export function filterRecipesByDiet(payload) {
  return {
    type: FILTER_BY_DIET,
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function orderByPuntuation(payload) {
  return {
    type: ORDER_BY_PUNTUATION,
    payload,
  };
}

export function getRecipesByName(name) {
  return async function (dispatch) {
    var json = await axios.get(`${process.env.REACT_APP_URL_API}/recipes?name=${name}`);
    return dispatch({
      type: GET_BY_NAME,
      payload: json.data,
    });
  };
}

export function getRecipesById(id) {
  return async function (dispatch) {
    var json = await axios.get(`${process.env.REACT_APP_URL_API}/recipes/${id}`);
    return dispatch({
      type: GET_BY_ID,
      payload: json.data,
    });
  };
}

export function getDiets() {
  return async function (dispatch) {
    var json = await axios.get(`${process.env.REACT_APP_URL_API}/diets`);
    return dispatch({
      type: GET_DIETS,
      payload: json.data,
    });
  };
}

export function postRecipes(payload) {
  return async function () {
    var json = await axios.post(`${process.env.REACT_APP_URL_API}/recipes`, payload);
    return json;
  };

}

export function filterCreated(payload){
  return {
    type: FILTER_CREATED,
    payload,
  }

  
}
