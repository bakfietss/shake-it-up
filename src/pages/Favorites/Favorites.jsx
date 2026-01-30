import React from "react";
import heroImage from "../../assets/page-imgs/StockCake-Sunset_Drink_Cheers-706461-standard.jpg";
import placeholder1 from "../../assets/placeholder-imgs/drink_icons001-01_g172.png";
import placeholder2 from "../../assets/placeholder-imgs/drink_icons001-01_g234.png";
import placeholder3 from "../../assets/placeholder-imgs/drink_icons001-01_g335.png";
import placeholder4 from "../../assets/placeholder-imgs/drink_icons001-01_g419.png";
import placeholder5 from "../../assets/placeholder-imgs/drink_icons001-01_g562.png";
import placeholder6 from "../../assets/placeholder-imgs/drink_icons001-01_g628.png";
import "./Favorites.scss";

function Favorites() {
  const testCocktails = [
    { id: 1, name: "Mojito", image: placeholder1, category: "Cocktail", alcoholic: "Alcoholic", glass: "Highball glass" },
    { id: 2, name: "Virgin Colada", image: placeholder2, category: "Shake", alcoholic: "Non alcoholic", glass: "Hurricane glass" },
    { id: 3, name: "Espresso Martini", image: placeholder3, category: "Cocktail", alcoholic: "Alcoholic", glass: "Cocktail glass" },
    { id: 4, name: "Shirley Temple", image: placeholder4, category: "Soft Drink", alcoholic: "Non alcoholic", glass: "Collins glass" },
    { id: 5, name: "Old Fashioned", image: placeholder5, category: "Ordinary Drink", alcoholic: "Alcoholic", glass: "Old-fashioned glass" },
    { id: 6, name: "Fruit Punch", image: placeholder6, category: "Punch", alcoholic: "Non alcoholic", glass: "Punch bowl" },
  ];

  return (
    <div className="favorites-page">
      <div className="favorites-hero">
        <img src={heroImage} alt="Cocktails" className="hero-image" />
        <div className="hero-overlay">
          <h1 className="hero-title">
            Your<br />
            Favorite<br />
            Collection
          </h1>
        </div>
      </div>

      <div className="favorites-content-section">
        <div className="favorites-container">
          <h2 className="section-title">Favorites</h2>

          <div className="favorites-grid">
            {testCocktails.map((cocktail) => (
              <div key={cocktail.id} className="cocktail-card">
                <img src={cocktail.image} alt={cocktail.name} />
                <div className="card-info">
                  <h3>{cocktail.name}</h3>
                  <div className="card-tags">
                    <span className="tag tag-category">{cocktail.category}</span>
                    <span className={`tag tag-alcoholic ${cocktail.alcoholic === "Alcoholic" ? "is-alcoholic" : "is-non-alcoholic"}`}>
                      {cocktail.alcoholic === "Alcoholic" ? "Alcoholic" : "Non-alc"}
                    </span>
                    <span className="tag tag-glass">{cocktail.glass}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Favorites;
