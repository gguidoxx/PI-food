import React from "react";
import styles from "./Paginado.module.css";

export default function Paginado({
  recipesPerPage,
  allRecipes,
  paginado,
  
}) {
  const pageNumbers = [];
  const totalPages = Math.ceil(allRecipes / recipesPerPage);
  for (let i = 0; i < totalPages; i++) {
    pageNumbers.push(i + 1);
  }
  return (
    <ul className={styles.ul}>
      {pageNumbers &&
        pageNumbers.map((n) => (
          <a
            className={styles.container}
            onClick={() => paginado(n)}
            key={n}
          >
            {n}
          </a>
        ))}
    </ul>
  );
}
