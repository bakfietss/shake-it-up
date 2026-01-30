import React, { useState } from "react";
import Grid from "../../components/Grid/Grid";
import CocktailCard from "../../components/CocktailCard/CocktailCard";
import { testCocktails } from "../../helpers/testData";
import "./Search.scss";

function Search() {
  const [activeTab, setActiveTab] = useState("name");
  const [zoekTerm, setZoekTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterAlcoholic, setFilterAlcoholic] = useState("all");
  const [filterGlass, setFilterGlass] = useState("");

  const categories = [...new Set(testCocktails.map(c => c.category))];
  const allIngredients = [...new Set(testCocktails.flatMap(c => c.ingredients))];
  const glasses = [...new Set(testCocktails.map(c => c.glass))];

  // filter logica
  const gefilterdeResultaten = testCocktails.filter(cocktail => {
    // tab-specifieke filter
    let matchTab = true;
    if (activeTab === "name" && zoekTerm) {
      matchTab = cocktail.name.toLowerCase().includes(zoekTerm.toLowerCase());
    } else if (activeTab === "category" && selectedCategory) {
      matchTab = cocktail.category === selectedCategory;
    } else if (activeTab === "ingredient" && selectedIngredient) {
      matchTab = cocktail.ingredients.includes(selectedIngredient);
    }

    // alcohol filter
    let matchAlcohol = true;
    if (filterAlcoholic === "alcoholic") {
      matchAlcohol = cocktail.alcoholic === "Alcoholic";
    } else if (filterAlcoholic === "non-alcoholic") {
      matchAlcohol = cocktail.alcoholic === "Non alcoholic";
    }

    // glass filter
    let matchGlass = true;
    if (filterGlass) {
      matchGlass = cocktail.glass === filterGlass;
    }

    return matchTab && matchAlcohol && matchGlass;
  });

  const hasActiveFilters = filterAlcoholic !== "all" || filterGlass !== "";

  return (
    <div className="search-page">
      <div className="search-header-section">
        <div className="search-container">
          <header className="search-header">
            <h1>Browse All Drinks</h1>
            <p>
              Discover your perfect cocktail from our collection of 600+ recipes. Search by name, filter by ingredients, or explore by category.
            </p>
          </header>

          <div className="filter-tabs">
            <button
              className={`tab-btn ${activeTab === "name" ? "active" : ""}`}
              onClick={() => setActiveTab("name")}
            >
              Name
            </button>
            <button
              className={`tab-btn ${activeTab === "category" ? "active" : ""}`}
              onClick={() => setActiveTab("category")}
            >
              Category
            </button>
            <button
              className={`tab-btn ${activeTab === "ingredient" ? "active" : ""}`}
              onClick={() => setActiveTab("ingredient")}
            >
              Ingredient
            </button>
          </div>

          <div className="search-bar-wrapper">
            {activeTab === "name" && (
              <input
                type="text"
                className="search-input"
                placeholder="Search by cocktail name..."
                value={zoekTerm}
                onChange={(e) => setZoekTerm(e.target.value)}
              />
            )}

            {activeTab === "category" && (
              <select
                className="search-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">-- Select a category --</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            )}

            {activeTab === "ingredient" && (
              <select
                className="search-select"
                value={selectedIngredient}
                onChange={(e) => setSelectedIngredient(e.target.value)}
              >
                <option value="">-- Select an ingredient --</option>
                {allIngredients.map((ing) => (
                  <option key={ing} value={ing}>{ing}</option>
                ))}
              </select>
            )}
          </div>

          <div className="search-controls">
            <button
              className={`tab-btn ${showFilters ? "active" : ""}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters {hasActiveFilters && "•"}
            </button>

            <p className="results-count">
              Showing {gefilterdeResultaten.length} Drinks
            </p>

            <select className="sort-dropdown">
              <option value="name">Sort by Name</option>
            </select>
          </div>

          {showFilters && (
            <div className="filter-panel">
              <div className="filter-group">
                <label className="filter-label">Alcoholic</label>
                <div className="filter-options">
                  <label className="filter-checkbox">
                    <input
                      type="radio"
                      name="alcoholic"
                      checked={filterAlcoholic === "all"}
                      onChange={() => setFilterAlcoholic("all")}
                    />
                    All
                  </label>
                  <label className="filter-checkbox">
                    <input
                      type="radio"
                      name="alcoholic"
                      checked={filterAlcoholic === "alcoholic"}
                      onChange={() => setFilterAlcoholic("alcoholic")}
                    />
                    Alcoholic
                  </label>
                  <label className="filter-checkbox">
                    <input
                      type="radio"
                      name="alcoholic"
                      checked={filterAlcoholic === "non-alcoholic"}
                      onChange={() => setFilterAlcoholic("non-alcoholic")}
                    />
                    Non-alcoholic
                  </label>
                </div>
              </div>

              <div className="filter-group">
                <label className="filter-label">Glass Type</label>
                <select
                  className="filter-select"
                  value={filterGlass}
                  onChange={(e) => setFilterGlass(e.target.value)}
                >
                  <option value="">All glasses</option>
                  {glasses.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="search-results-section">
        <div className="search-container">
          {gefilterdeResultaten.length === 0 ? (
            <p className="no-results">Geen cocktails gevonden</p>
          ) : (
            <Grid>
              {gefilterdeResultaten.map((cocktail) => (
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
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
