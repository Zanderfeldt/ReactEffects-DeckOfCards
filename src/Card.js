import React, { useState, useEffect } from 'react';

const Card = ({name, image}) => {

  // const [{angle, xPos, yPos}] = useState({
  //   angle: Math.random() * 90 - 45,
  //   xPos: Math.random() * 40 - 20,
  //   yPos: Math.random() * 40 - 20
  // });

  // const transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;

  return <img src={image} alt={name} />
  
}

export default Card;