import React from "react";
import { Link } from "react-router-dom";
import styles from "./404.module.css";

export default function Error(){
    return(
        <div className={styles.main}>
            <h1>404</h1>
            <h5>page not found</h5>
            <Link to="/home"><button>Home</button></Link>
        </div>
    )
}