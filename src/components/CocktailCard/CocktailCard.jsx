import { Link } from "react-router-dom";
import "./CocktailCard.scss";

function CocktailCard({ idDrink, strDrink, strDrinkThumb, strCategory, strAlcoholic, strGlass }) {
  return (
    <Link to={`/cocktail/${idDrink}`} className="cocktail-card">
      <img src={strDrinkThumb} alt={strDrink} />
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
