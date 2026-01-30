import React, { useState } from "react";
import placeholder1 from "../../assets/placeholder-imgs/drink_icons001-01_g172.png";
import placeholder2 from "../../assets/placeholder-imgs/drink_icons001-01_g234.png";
import placeholder3 from "../../assets/placeholder-imgs/drink_icons001-01_g335.png";
import placeholder4 from "../../assets/placeholder-imgs/drink_icons001-01_g419.png";
import placeholder5 from "../../assets/placeholder-imgs/drink_icons001-01_g562.png";
import placeholder6 from "../../assets/placeholder-imgs/drink_icons001-01_g628.png";
import placeholder7 from "../../assets/placeholder-imgs/drink_icons001-01_g75.png";
import "./Search.scss";

function Search() {
  const [activeTab, setActiveTab] = useState("name");
  const [zoekTerm, setZoekTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterAlcoholic, setFilterAlcoholic] = useState("all");
  const [filterGlass, setFilterGlass] = useState("");

  const testCocktails = [
    { id: 1, name: "Mojito", image: placeholder1, category: "Cocktail", alcoholic: "Alcoholic", glass: "Highball glass", ingredients: ["Rum", "Lime", "Mint"] },
    { id: 2, name: "Virgin Colada", image: placeholder2, category: "Shake", alcoholic: "Non alcoholic", glass: "Hurricane glass", ingredients: ["Coconut", "Pineapple"] },
    { id: 3, name: "Espresso Martini", image: placeholder3, category: "Cocktail", alcoholic: "Alcoholic", glass: "Cocktail glass", ingredients: ["Vodka", "Coffee"] },
    { id: 4, name: "Shirley Temple", image: placeholder4, category: "Soft Drink", alcoholic: "Non alcoholic", glass: "Collins glass", ingredients: ["Ginger Ale", "Grenadine"] },
    { id: 5, name: "Old Fashioned", image: placeholder5, category: "Ordinary Drink", alcoholic: "Alcoholic", glass: "Old-fashioned glass", ingredients: ["Whiskey", "Bitters"] },
    { id: 6, name: "Fruit Punch", image: placeholder6, category: "Punch", alcoholic: "Non alcoholic", glass: "Punch bowl", ingredients: ["Orange Juice", "Pineapple"] },
    { id: 7, name: "Margarita", image: placeholder7, category: "Cocktail", alcoholic: "Alcoholic", glass: "Cocktail glass", ingredients: ["Tequila", "Lime", "Triple Sec"] },
  ];

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
          <div className="results-grid">
            {gefilterdeResultaten.length === 0 && (
              <p className="no-results">Geen cocktails gevonden</p>
            )}

            {gefilterdeResultaten.map((cocktail) => (
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

export default Search;
