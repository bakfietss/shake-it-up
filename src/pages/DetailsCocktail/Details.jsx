import { useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import { testCocktails } from "../../helpers/testData";
import "./Details.scss";

function Details() {
  const { id } = useParams();
  const cocktail = testCocktails.find(c => c.idDrink === id);

  function haalIngredienten(drink) {
    const ingredienten = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredienten.push({
          ingredient: ingredient.trim(),
          measure: measure ? measure.trim() : ""
        });
      }
    }
    return ingredienten;
  }

  const ingredienten = haalIngredienten(cocktail);

  return (
    <div className="details-page">
      <div className="details-container">
        <div className="details-left">
          <div className="cocktail-title-row">
            <h1 className="cocktail-name">{cocktail.strDrink}</h1>
            <button className="favorite-heart">
              <svg viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
          </div>

          <div className="cocktail-image-wrapper">
            <img
              src={cocktail.strDrinkThumb}
              alt={cocktail.strDrink}
              className="cocktail-image"
            />
          </div>
        </div>

        <div className="details-right">
          <h2 className="recipe-heading">Receptuur</h2>

          <div className="recipe-list">
            {ingredienten.map((item, index) => (
              <div key={index} className="recipe-item">
                <span className="recipe-label">Component {index + 1}:</span>
                <span className="recipe-text">
                  {item.measure} {item.ingredient}
                </span>
              </div>
            ))}
          </div>

          {cocktail.strInstructions && (
            <div className="preparation-section">
              <h3 className="preparation-heading">Bereidingswijze</h3>
              <p className="preparation-text">{cocktail.strInstructions}</p>
            </div>
          )}

          <Button btnType="solid" className="favorite-button-large">
            Save Favorite
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Details;
