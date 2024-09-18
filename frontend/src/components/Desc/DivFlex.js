import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice, faSmile, faStar } from '@fortawesome/free-solid-svg-icons';
import "./DivFlex.css";

export default function DivFlex() {
  return (
    <div className="mainDiv">
      <div className="subDiv">Fresh Pizza <FontAwesomeIcon icon={faPizzaSlice} /></div>
      <div className="subDiv">Friendly service <FontAwesomeIcon icon={faSmile} /></div>
      <div className="subDiv">Premium Quality <FontAwesomeIcon icon={faStar} /></div>
    </div>
  );
}
