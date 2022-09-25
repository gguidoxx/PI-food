import { getRecipesById, clearState} from "../actions";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router";
import styles from "./Detail.module.css";

export default function Detail(props) {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getRecipesById(id));
    return dispatch(clearState())
  }, []);
  
  const myRecipe = useSelector((state) => state.details);
  console.log(myRecipe);
  return (
    <div className={styles.container}>
      
      {myRecipe.length > 0 ? (
        <div>
          <h1 className={styles.title}>{myRecipe[0].title}</h1>
          <Link to="/home">
            <button className={styles.btn}>Go back🏠</button>
          </Link>

          <div className={styles.imagen}>
            <div className={styles.imgdiet}>
              <img src={myRecipe[0].image} alt="not found" />
              <h4 className={styles.diet}>
                {myRecipe[0].diets.map((e) => (
                  <li> {e.name.toUpperCase()}</li>
                ))}
              </h4>
            </div>
            <div className={styles.summary}>
              <h3>
                Summary: <br></br>
              </h3>
              <h4
                dangerouslySetInnerHTML={{ __html: myRecipe[0].summary }}
              ></h4>

              <h3>
                Steps: <br></br>
              </h3>
              <h4>
                {Array.isArray(myRecipe[0].stepByStep)
                  ? myRecipe[0].stepByStep.map((e) =>
                      e.steps.map((s) => s.step)
                    )
                  : myRecipe[0].stepByStep}
              </h4>
              <h3>
                HealthScore: <br></br></h3>
                <h4>%{myRecipe[0].healthScore}</h4>
              
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.spinner}>
          <span>L</span>
          <span>O</span>
          <span>A</span>
          <span>D</span>
          <span>I</span>
          <span>N</span>
          <span>G</span>
        </div>
      )}
    </div>
  );
}
