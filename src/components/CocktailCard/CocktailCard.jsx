import { Link } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import { useFavorites } from "../../context/FavoritesContext";
import "./CocktailCard.scss";

function CocktailCard({ idDrink, strDrink, strDrinkThumb, strCategory, strAlcoholic, strGlass }) {
  const { showToast } = useToast();
  const { toggleFavorite, isFavorite } = useFavorites();

  const isFav = isFavorite(idDrink);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    toggleFavorite({ idDrink, strDrink, strDrinkThumb, strCategory, strAlcoholic, strGlass });
    showToast(isFav ? "Verwijderd uit favorieten" : "Toegevoegd aan favorieten!", isFav ? "info" : "success");
  };

  return (
    <Link to={`/cocktail/${idDrink}`} className="cocktail-card">
      <div className="card-image-wrapper">
        <img src={strDrinkThumb} alt={strDrink} />
        <button className={`favorite-button ${isFav ? "is-favorite" : ""}`} onClick={handleFavoriteClick}>
          <svg viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>
      <div className="card-info">
        <h3>{strDrink}</h3>
        <div className="card-tags">
          <span className="tag tag-category">{strCategory}</span>
          <span className={`tag tag-alcoholic ${strAlcoholic === "Alcoholic" ? "is-alcoholic" : "is-non-alcoholic"}`}>
            {strAlcoholic === "Alcoholic" ? "Alcoholic" : "Non-alc"}
          </span>
          <span className="tag tag-glass">{strGlass}</span>
        </div>
      </div>
    </Link>
  );
}

export default CocktailCard;
