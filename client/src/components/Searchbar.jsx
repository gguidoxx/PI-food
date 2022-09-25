import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesByName } from "../actions/index";


export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const recipes = useSelector((state) => state.recipes);


  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    if (!name) {
      return getRecipesByName()
    }
    else{
      dispatch(getRecipesByName(name));

    }
    console.log(name);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      return getRecipesByName()
    }
    else{
      dispatch(getRecipesByName(name));

    }
  }
  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          type="text"
          placeholder="Search recipe..."
          onChange={(e) => handleInputChange(e)}
        />
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          🔎
        </button>
      </form>
    </div>
  );
}
