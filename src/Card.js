import React from "react";

const Card = ({ code, image }) => {
    return(
        <div>
            <img key={code} src={image} />
        </div>
    )
}

export default Card;