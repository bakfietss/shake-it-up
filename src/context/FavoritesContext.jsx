import { createContext, useState, useEffect, useContext } from 'react'

export const FavoritesContext = createContext({})

export function useFavorites() {
    return useContext(FavoritesContext)
}

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('favorites')) || []
        setFavorites(saved)
    }, [])

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    function toggleFavorite(cocktail) {
        setFavorites(prev => {
            const exists = prev.some(fav => fav.idDrink === cocktail.idDrink)
            if (exists) {
                return prev.filter(fav => fav.idDrink !== cocktail.idDrink)
            }
            return [...prev, cocktail]
        })
    }

    function isFavorite(cocktailId) {
        return favorites.some(fav => fav.idDrink === cocktailId)
    }

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    )
}
