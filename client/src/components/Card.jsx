import React from "react";

export default function Card({id, title, image, diet}){
    return(
    <div>
    <h3>{title}</h3>
    <h5>{diet}</h5>
    <img src={image? image: 'https://img.freepik.com/vector-gratis/plato-cubiertos_1284-42854.jpg?w=900&t=st=1660155905~exp=1660156505~hmac=1ee908a2c8e206680afceb33a68164822724ffa2cdbe04a2e78c86cde2db9dbf'} alt="not found" width='200px'/>
    </div>)
}