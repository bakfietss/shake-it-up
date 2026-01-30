import React from "react";
import heroImage from "../../assets/page-imgs/StockCake-Sunset_Drink_Cheers-706461-standard.jpg";
import Grid from "../../components/Grid/Grid";
import CocktailCard from "../../components/CocktailCard/CocktailCard";
import { testCocktails } from "../../helpers/testData";
import "./Favorites.scss";

function Favorites() {

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

          <Grid>
            {testCocktails.map((cocktail) => (
              <CocktailCard
                key={cocktail.id}
                id={cocktail.id}
                name={cocktail.name}
                image={cocktail.image}
                category={cocktail.category}
                alcoholic={cocktail.alcoholic}
                glass={cocktail.glass}
              />
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Favorites;
