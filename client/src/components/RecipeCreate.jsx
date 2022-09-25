import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postRecipes, getDiets } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { Validations } from "./validations.jsx";
import a from "./RecipeCreate.module.css";

export default function RecipeCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const listDiets = useSelector((state) => state.diets);
  const [errors, setErrors] = useState({});
  const recipes = useSelector((state) => state.recipes);

  const [input, setInput] = useState({
    title: "",
    summary: "",
    healthScore: 0,
    steps: [],
    image: "",
    diets: [],
  });
  

  const handleInputChange = (e) => {
    if (input.diets) {
    }
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      Validations({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };
  const handleDelete = (e) => {
    const inputFiltered = input.diets.filter((diet) => diet !== e)
    setInput({
      ...input,
      diets: inputFiltered,
    })
    setErrors(
      Validations({
        ...input,
        diets: inputFiltered,
      }));
  };

  const handleSelect = (e) => {
    setInput({
      ...input,
      diets: [...new Set([...input.diets, e.target.value])],
    });
    console.log("DIETAS PASADAS", e.target.value )
    setErrors(
      Validations({
        ...input,
        diets: [...new Set([...input.diets, e.target.value])],
      })
    );
  };

  // const deleteDiet = (d) => {
  //   setInput({
  //     ...input,
  //     diets: input.diets.filter(
  //       (diets) => diets.toLowerCase() !== d.toLowerCase()
  //     ),
  //   });
  //   console.log(input.diets);
  // };

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const exist = recipes.every(
    (r) => r.title.toUpperCase() !== input.title.toUpperCase()
  );

  const handleSubmit = (e) => {
    e.preventDefault(e);
    console.log("Esto es DIETS =====", input.diets)
    if (input.image === "") {
      input.image =
        "https://imgs.search.brave.com/_KPvrLWa9wT9dTKgNV9dQwk7IWkdnjWzC-Cv7cyJRo0/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9jZG4u/aGVhbHRobndlbGwu/Y29tL2hlYWx0aG53/ZWxsL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE4LzA0LzhiZWYx/OTY1LTI0MDQtNDky/OS1hYjI5LTFmZGIx/ZWIzYjY5Zi5qcGc";
    }
    if (!exist) {
      return alert("NAME ALREADY EXIST");
    } else if (Object.keys(errors).length) {
      return alert(Object.values(errors));
    } else {
      dispatch(postRecipes(input));
      alert("¡RECIPE CREATED!");
      setInput({
        title: "",
        summary: "",
        healthScore: 0,
        steps: [],
        image: "",
        diets: [],
      });
      history.push("/home");
    }
  };
  return (
    <div className={a.Parent}>
      <div className={a.Container}>
        <h1 className={a.Title}>HERE YOU CAN CREATE A NEW MEAL</h1>
        <form
          key={listDiets.id}
          autoComplete="off"
          className={a.Form}
          onSubmit={(e) => handleSubmit(e)}
          spellCheck="true"
        >
          <label className={a.Subtitle}>NAME</label>
          <input
            type="text"
            className={a.InputCreate}
            placeholder="type here"
            name="title"
            input={input.title}
            onChange={(e) => handleInputChange(e)}
            required
          ></input>
          {errors.title && <h1 className={a.titleErrors}>{errors.title}</h1>}
          <label className={a.Subtitle}>SUMMARY</label>
          <input
            type="text"
            className={a.InputCreate}
            placeholder="type here"
            name="summary"
            input={input.summary}
            onChange={(e) => handleInputChange(e)}
            required
          ></input>
          {errors.summary && (
            <h1 className={a.titleErrors}>{errors.summary}</h1>
          )}
          <label className={a.Subtitle}>
            STEP BY STEP
          </label>
          <input
            type="text"
            className={a.InputCreate}
            placeholder="type here"
            name="steps"
            input={input.steps}
            onChange={(e) => handleInputChange(e)}
            required
          ></input>
          {errors.steps && <h1 className={a.titleErrors}>{errors.steps}</h1>}
          <label className={a.Subtitle}>HEALTH SCORE</label>
          <input
            type="number"
            placeholder="type here"
            className={a.InputCreate}
            name="healthScore"
            input={input.healthScore}
            onChange={(e) => handleInputChange(e)}
            required
          ></input>
          {errors.healthScore && (
            <h1 className={a.titleErrors}>{errors.healthScore}</h1>
          )}
          <label className={a.Subtitle}>IMAGE</label>
          <input
            type="text"
            placeholder="paste your URL here"
            className={a.InputCreate}
            name="image"
            input={input.image}
            onChange={(e) => handleInputChange(e)}
          ></input>
          {errors.image && <h1 className={a.titleErrors}>{errors.image}</h1>}
          <label className={a.Subtitle}>
           DIETS
          </label>
          <select className={a.Select} onChange={(e) => handleSelect(e)}>
            {listDiets?.map((t) => {
              return <option value={t}> {t.toUpperCase()} </option>;
            })}
          </select>
          {errors.diets && <h1 className={a.titleErrors}>{errors.diets}</h1>}
          <ul>
            <li className={a.List}>
              {input.diets?.map((d) => (
                <p>
                  {`${d.toUpperCase()}`}
                </p>
              ))}
            </li>
          </ul>
          
          <button className={a.Submit} type="submit">
            CREATE
          </button>
          <Link to="/home">
          <button className={a.noSubmit}>Home</button>
          </Link>
        </form>
        {input.diets.map((e) => (
          <div className={a.DeleteContainer}>
            <p>{e}</p>
            <button className={a.Delete} onClick={() => handleDelete(e)}>x</button>
          </div>
        ))}
      </div>
    </div>
  );
}
