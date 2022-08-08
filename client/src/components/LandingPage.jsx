import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage(){
    return (
        <div className={styles.landing}>
        
            <h1 className={styles.wlc}>Bienvenidos al recetario.</h1>
            <Link to= '/home'> 
            <button className={styles.btn}>Inicio</button>
            </Link>
        </div>
       
    )
}