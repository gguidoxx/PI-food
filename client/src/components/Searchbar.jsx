import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByName } from "../actions/index";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState();
  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getRecipesByName(name));
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
