import React from "react";
import { Link } from "react-router-dom";


export default function AfterCreate(){
    return(<div>
        <h1>Recipe created!</h1>
        <Link to="/home"><button>Back to Home</button></Link>
    </div>)

}
