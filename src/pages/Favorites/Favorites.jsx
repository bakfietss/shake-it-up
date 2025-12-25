import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Button/Button";
import "./Favorites.css";

const Favorites = ({ onAuthClick }) => {
  const navigate = useNavigate();

  // Demo cocktails - replace with real data later
  const demoCocktails = [
    { id: 1, name: "Margarita", category: "Classic" },
    { id: 2, name: "Mojito", category: "Tropical" },
    { id: 3, name: "Old Fashioned", category: "Classic" },
  ];

  return (
    <>
      <Navbar onAuthClick={onAuthClick} />
      <div className="favorites-container">
        <div className="favorites-content">
          <h1>My Favorites</h1>
          <p>Your favorite cocktail recipes in one place</p>

          <div className="favorites-list">
            {demoCocktails.length > 0 ? (
              <div className="cocktails-grid">
                {demoCocktails.map((cocktail) => (
                  <div key={cocktail.id} className="cocktail-card">
                    <h3>{cocktail.name}</h3>
                    <p className="cocktail-category">{cocktail.category}</p>
                    <Button
                      variant="glass"
                      onClick={() => navigate(`/cocktail/${cocktail.id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No favorites yet</p>
                <p className="empty-subtitle">
                  Start exploring and save your favorite cocktails!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Favorites;
