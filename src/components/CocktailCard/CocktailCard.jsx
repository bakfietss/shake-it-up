import { Link } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import { useFavorites } from "../../context/FavoritesContext";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import "./CocktailCard.scss";

function CocktailCard({ idDrink, strDrink, strDrinkThumb, strCategory, strAlcoholic, strGlass }) {
  const { showToast } = useToast();
  const { toggleFavorite, isFavorite } = useFavorites();

  const isFav = isFavorite(idDrink);

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const gelukt = await toggleFavorite({ idDrink, strDrink, strDrinkThumb, strCategory, strAlcoholic, strGlass });
    if (!gelukt) {
      showToast("Log in om favorieten op te slaan", "warning");
      return;
    }
    showToast(isFav ? "Verwijderd uit favorieten" : "Toegevoegd aan favorieten!", isFav ? "info" : "success");
  };

  return (
    <Link to={`/cocktail/${idDrink}`} className="cocktail-card">
      <div className="card-image-wrapper">
        <img src={strDrinkThumb} alt={strDrink} />
        <FavoriteButton className="favorite-button" isFavorite={isFav} onClick={handleFavoriteClick} />
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
