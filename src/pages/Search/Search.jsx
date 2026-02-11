import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { DEBOUNCE_DELAY, DEFAULT_LETTER, fetchByLetter, searchByName, searchByCategory, searchByIngredient, fetchDetailsForBatch, fetchFilterOptions } from "./searchHelper";
import Grid from "../../components/Grid/Grid";
import CocktailCard from "../../components/CocktailCard/CocktailCard";
import "./Search.scss";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "name";
  const zoekTerm = searchParams.get("q") || "";
  const selectedCategory = searchParams.get("category") || "";
  const selectedIngredient = searchParams.get("ingredient") || "";

  const setActiveTab = (tab) => {
    setSearchParams(prev => { prev.set("tab", tab); return prev })
  }
  const setZoekTerm = (q) => {
    setSearchParams(prev => { prev.set("q", q); return prev })
  }
  const setSelectedCategory = (cat) => {
    setSearchParams(prev => { prev.set("category", cat); return prev })
  }
  const setSelectedIngredient = (ing) => {
    setSearchParams(prev => { prev.set("ingredient", ing); return prev })
  }

  const [showFilters, setShowFilters] = useState(false);
  const [filterAlcoholic, setFilterAlcoholic] = useState("all");
  const [filterGlass, setFilterGlass] = useState("");

  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [glasses, setGlasses] = useState([]);

  useEffect(() => {
    fetchFilterOptions().then(options => {
      setCategories(options.categories)
      setIngredients(options.ingredients)
      setGlasses(options.glasses)
    })
  }, [])

  useEffect(() => {
    if (activeTab !== "name") return
    if (!zoekTerm.trim()) {
      loadCocktails(() => fetchByLetter(DEFAULT_LETTER))
      return
    }
    const timeout = setTimeout(() => {
      loadCocktails(() => searchByName(zoekTerm))
    }, DEBOUNCE_DELAY)
    return () => clearTimeout(timeout)
  }, [zoekTerm])

  useEffect(() => {
    if (activeTab === "category" && selectedCategory) {
      loadCocktails(async () => {
        const filterResults = await searchByCategory(selectedCategory)
        return await fetchDetailsForBatch(filterResults)
      })
    }
    if (activeTab === "ingredient" && selectedIngredient) {
      loadCocktails(async () => {
        const filterResults = await searchByIngredient(selectedIngredient)
        return await fetchDetailsForBatch(filterResults)
      })
    }
  }, [selectedCategory, selectedIngredient])

  async function loadCocktails(fetchFn) {
    setLoading(true)
    setError(null)
    try {
      const results = await fetchFn()
      setCocktails(results)
    } catch (err) {
      console.error("API error:", err)
      setError("Kon cocktails niet laden")
    }
    setLoading(false)
  }

  const filtered = cocktails.filter(c => {
    if (filterAlcoholic === "alcoholic" && c.strAlcoholic !== "Alcoholic") return false
    if (filterAlcoholic === "non-alcoholic" && c.strAlcoholic !== "Non alcoholic") return false
    if (filterGlass && c.strGlass !== filterGlass) return false
    return true
  })

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
                  <option key={cat.strCategory} value={cat.strCategory}>{cat.strCategory}</option>
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
                {ingredients.map((ing) => (
                  <option key={ing.strIngredient1} value={ing.strIngredient1}>{ing.strIngredient1}</option>
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
              {loading ? "Loading..." : `Showing ${filtered.length} Drinks`}
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
                    <option key={g.strGlass} value={g.strGlass}>{g.strGlass}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="search-results-section">
        <div className="search-container">
          {loading && <p className="loading-message">Cocktails laden...</p>}
          {error && <p className="error-message">{error}</p>}
          {!loading && !error && filtered.length === 0 && (
            <p className="no-results">Geen cocktails gevonden</p>
          )}
          {!loading && !error && filtered.length > 0 && (
            <Grid>
              {filtered.map((cocktail) => (
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

export default Search;
