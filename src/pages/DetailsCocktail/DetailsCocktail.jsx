import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Button/Button";
import "./DetailsCocktail.css";

const DetailsCocktail = ({ onAuthClick }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <Navbar onAuthClick={onAuthClick} />
      <div className="details-container">
        <div className="details-content">
          <Button
            variant="glass"
            className="back-button"
            onClick={() => navigate(-1)}
          >
            ← Back
          </Button>

          <div className="cocktail-header">
            <h1>Cocktail Name</h1>
            <p className="cocktail-category">Classic • Alcoholic</p>
          </div>

          <div className="cocktail-details">
            <div className="details-section">
              <h2>Ingredients</h2>
              <ul className="ingredients-list">
                <li>2 oz Vodka</li>
                <li>1 oz Triple Sec</li>
                <li>1 oz Lime Juice</li>
                <li>Splash of Cranberry</li>
              </ul>
            </div>

            <div className="details-section">
              <h2>Instructions</h2>
              <ol className="instructions-list">
                <li>Add all ingredients to a shaker with ice</li>
                <li>Shake well until chilled</li>
                <li>Strain into a chilled glass</li>
                <li>Garnish and serve</li>
              </ol>
            </div>

            <div className="details-section">
              <h2>Glass Type</h2>
              <p>Martini Glass</p>
            </div>
          </div>

          <div className="details-actions">
            <Button variant="primary">Add to Favorites</Button>
            <Button variant="glass">Share Recipe</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsCocktail;
