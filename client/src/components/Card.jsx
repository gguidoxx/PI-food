import React from "react";
import styles from "./Card.module.css";

export default function Card({ id, title, image, diets, healthScore }) {
  console.log(diets);
  return (
    <div className={styles.card}>
      <div className={styles.cd}>
        <h3>{title}</h3>
        <img
          className={styles.cardimg}
          src={
            image
              ? image
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5KKebEqn5ILWSba925GRjqdN9yk3nkE173w&usqp=CAU"
          }
          alt="img not found"
        />
        <div className={styles.tipes}>
          {" "}
          {diets.map((t) => (
            <li key={t.name}>
              <span key={t.name}> {t.name}</span>
            </li>
          ))}{" "}
        </div>
      </div>
    </div>
  );
}
