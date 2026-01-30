import React from "react";
import "./CocktailCard.scss";

function CocktailCard({ id, name, image, category, alcoholic, glass }) {
  return (
    <div className="cocktail-card">
      <img src={image} alt={name} />
      <div className="card-info">
        <h3>{name}</h3>
        <div className="card-tags">
          <span className="tag tag-category">{category}</span>
          <span className={`tag tag-alcoholic ${alcoholic === "Alcoholic" ? "is-alcoholic" : "is-non-alcoholic"}`}>
            {alcoholic === "Alcoholic" ? "Alcoholic" : "Non-alc"}
          </span>
          <span className="tag tag-glass">{glass}</span>
        </div>
      </div>
    </div>
  );
}

export default CocktailCard;
