import React from "react";
import styles from "./Card.module.css";

export default function Card({ id, title, image, diets, healthScore }) {
  console.log(diets)
  return (
    
    <div className={styles.card}>
      <div className={styles.cd}>
        <h3>{title}</h3>
        <img
          className={styles.cardimg}
          src={
            image
              ? image
              : "https://image.freepik.com/foto-gratis/tabla-picar-rodeada-verduras-huevos-granos-arroz-escritorio_23-2148062361.jpg"
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
