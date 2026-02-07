import heroImage from "../../assets/page-imgs/StockCake-Sunset_Drink_Cheers-706461-standard.jpg";
import Grid from "../../components/Grid/Grid";
import CocktailCard from "../../components/CocktailCard/CocktailCard";
import { useFavorites } from "../../context/FavoritesContext";
import "./Favorites.scss";

function Favorites() {
  const { favorites } = useFavorites();

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

          {favorites.length === 0 ? (
            <p className="no-favorites">Je hebt nog geen favorieten opgeslagen.</p>
          ) : (
            <Grid>
              {favorites.map((cocktail) => (
                <CocktailCard
                  key={cocktail.idDrink}
                  idDrink={cocktail.idDrink}
                  strDrink={cocktail.strDrink}
                  strDrinkThumb={cocktail.strDrinkThumb}
                  strCategory={cocktail.strCategory}
                  strAlcoholic={cocktail.strAlcoholic}
                  strGlass={cocktail.strGlass}
                />
              ))}
            </Grid>
          )}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
