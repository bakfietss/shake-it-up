import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Button/Button";
import "./Random.css";

const Random = ({ onAuthClick }) => {
  const handleRandomize = () => {
    console.log("Randomizing cocktail...");
  };

  return (
    <>
      <Navbar onAuthClick={onAuthClick} />
      <div className="random-container">
        <div className="random-content">
          <h1>Surprise Me!</h1>
          <p>Get a random cocktail and discover something new</p>

          <div className="random-card">
            <div className="random-placeholder">
              <p>Click the button below to get a random cocktail</p>
            </div>

            <Button variant="primary" onClick={handleRandomize}>
              Get Random Cocktail
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Random;
