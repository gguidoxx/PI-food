import React from "react";
import a from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={a.loader}>
    <div className={a.scanner}>
      <h1>Loading...</h1>
    </div>
  </div>
  );
}
