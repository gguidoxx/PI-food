import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipes,
  filterRecipesByDiet,
  orderByName,
  orderByPuntuation,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./Searchbar";

export default function Home() {
  const dispatch = useDispatch(); //Es lo mismo que hacer un maptoprops
  const allRecipes = useSelector((state) => state.recipes);

  //PAGINADO
  const [search, setSearch] = useState("");
  const [orden, setOrden] = useState("");
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // seteo en que página inicio
  const [recipesPerPage, setRecipesPerPage] = useState(9); // seteo cuantas recetas voy a mostrar por página
  const indexOfLastRecipe = currentPage * recipesPerPage; // Multiplico la página actual por la cantidad de recetas a mostrar. Ejemplo Página 3 x 9 recetas = indice 27 la última.
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; // Si resto el indice que tomé de la const anterior, por la cantidad de recetas, me da la primer receta de la pag.
  const currentRecipes = allRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  ); // Me devuelve el índice 0 y el índice 8 (9 recetas) de cada página.

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //TERMINA PAGINADO

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }
  function handleFilterTypeDiet(e) {
    dispatch(filterRecipesByDiet(e.target.value));
  }
  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`ordenado ${e.target.value}`);
  }
  function handlePuntuation(e) {
    e.preventDefault();
    dispatch(orderByPuntuation(e.target.value));
    setCurrentPage(1);
    setOrder(`ordenado ${e.target.value}`);
  }

  return (
    <div>
      <Link to="/recipes">Crear receta.</Link>
      <h1>Recetario de Guido.</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Recargar las recetas.
      </button>
      <div>
        <select onChange={(e) => handleSort(e)}>
          <option>Name order</option>
          <option value="asc">A to Z</option>
          <option value="desc">Z to A</option>
        </select>
        <select onChange={(e) => handlePuntuation(e)}>
          <option>Health filter</option>
          <option value="mayormenor">Healthier</option>
          <option value="menormayor">Less healthy</option>
        </select>
        <select onChange={(e) => handleFilterTypeDiet(e)}>
          <option value="All">All recipes</option>
          <option value="gluten free">Gluten Free</option>
          <option value="ketogenic">Ketogenic</option>
          <option value="vegetarian">Vegetarian </option>
          <option value="lacto-vegetarian">Lacto-Vegetarian </option>
          <option value="lacto ovo vegetarian">Ovo-Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="pescatarian">Pescatarian</option>
          <option value="paleolithic">Paleolithic</option>
          <option value="primal">Primal</option>
          <option value="whole 30">Whole 30</option>
        </select>
        <SearchBar></SearchBar>
        <Paginado
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginado={paginado}
        />

        {currentRecipes?.map((e) => {
          return (
            <Link to={"/home/" + e.id}>
              <Card title={e.title} image={e.image} diet={e.diet} key={e.id} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
