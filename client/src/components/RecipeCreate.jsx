import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postRecipes, getDiets } from "../actions";
import { useDispatch, useSelector } from "react-redux";




function validate(input){
  const regexp  = new RegExp('^[0-9]+$')
  let errores={};
  if(!input.title){
    errores.title= 'All recipes need a title.'
  }
  if (!input.summary) {
    errores.summary= 'Please tell us about your new recipe'
  }
  if(!input.image){
    errores.image='Please paste image address'
  }
  if (!input.diets) {
    errores.diets = 'Recipes need a diets'
  }
  if (input.healthScore > 100||  input.healthScore < 1) {
    errores.healthScore= 'HealthScore must be less than 100 and greater than 1'
  }
  if (!input.stepByStep) {
    errores.stepByStep = 'We need to know how to make this meal'
  }
  return errores
}

export default function RecipeCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const listDiets = useSelector((state) => state.diets);
  const [errores, setErrores] = useState({});

  

  const [input, setInput] = useState({
    title: "",
    summary: "",
    image: "",
    diets: [],
    healthScore: "",
    stepByStep: "",
  });

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrores(validate({
      ...input,
      [e.target.name]: e.target.value,
    }));
  }
  function handleSelect(e) {
    setInput({
      ...input,
      diets: [...input.diets, e.target.value],
    });
  }
  function handleDelete(e) {
    setInput({
      ...input,
      diet: input.diets.filter((diet) => diet !== e),
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postRecipes(input));
    setInput({
      title: "",
      summary: "",
      image: "",
      diets: [],
      healthScore: "",
      stepByStep: "",
    });
    history.push("/home");
  }

  return (
    <div>
      <Link to="/home">
        <button> Return to home. </button>
      </Link>
      <h1>Make a new recipe.</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div>
          <label>Title: </label>
          <input
            type="text"
            value={input.name}
            name="title"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {errores.title &&(<p>{errores.title}</p>)}
        </div>
        <div>
          <label>Health Score: </label>
          <input
            type="number"
            min="0"
            max="100"
            value={input.healthScore}
            name="healthScore"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {errores.healthScore &&(<p>{errores.healthScore}</p>)}
        </div>
        <div>
          <label>Image: </label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {errores.image &&(<p>{errores.image}</p>)}
        </div>
        <div>
          <label>Summary: </label>
          <input
            type="text"
            value={input.summary}
            name="summary"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {errores.summary &&(<p>{errores.summary}</p>)}
        </div>

        <div>
          <label>Step by step: </label>
          <input
            type="text"
            value={input.stepByStep}
            name="stepByStep"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {errores.stepByStep &&(<p>{errores.stepByStep}</p>)}
        </div>
        <div>
          <label>Type diet: </label>
          <select
            onChange={(e) => {
              handleSelect(e);
            }}
          >
            {listDiets?.map((t) => {
              return <option value={t}>{t} </option>;
            })}
            {errores.diets &&(<p>{errores.diets}</p>)}
          </select>
        </div>
        <ul>
          <li>{input.diets.map((e) => e + ", ")}</li>
        </ul>
        <button type="submit">Create recipe</button>
      </form>
    </div>
  );
}
