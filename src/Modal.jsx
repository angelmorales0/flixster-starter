import React, { useState } from "react";
import "./Modal.css";

export default function Modal(props) {
  return (
    <>
      <div>
        <div className="overlay">
          <div className="modal-cotnet">
            <h2>{props.title}</h2>
            <img src={props.poster_image}></img>
            <p>Released on {props.releaseDate}</p>
            <p>{props.overview}</p>
            <p>Score: {props.rating}</p>
            <button className="modal-btn" onClick={props.onClick}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
