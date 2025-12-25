import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./SearchCocktail.css";

const SearchCocktail = ({ onAuthClick }) => {
  return (
    <>
      <Navbar onAuthClick={onAuthClick} />
      <div className="search-container">
        <div className="search-content">
          <h1>Search Cocktails</h1>
          <p>Find your perfect cocktail from 600+ recipes</p>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search by name, ingredient, or category..."
              className="search-input"
            />
          </div>

          <div className="results-placeholder">
            <p>Start typing to search for cocktails</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchCocktail;
