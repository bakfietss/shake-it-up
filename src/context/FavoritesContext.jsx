import { createContext, useState, useEffect, useContext } from 'react'
import { AuthContext } from './AuthContext'

export const FavoritesContext = createContext({})

export function useFavorites() {
    return useContext(FavoritesContext)
}

export function FavoritesProvider({ children }) {
    const { isAuth, user } = useContext(AuthContext)
    const [favorites, setFavorites] = useState([])

    // laad favorites voor ingelogde user
    useEffect(() => {
        if (isAuth && user) {
            const key = `favorites_${user.id}`
            const saved = JSON.parse(localStorage.getItem(key)) || []
            setFavorites(saved)
        } else {
            setFavorites([])
        }
    }, [isAuth, user])

    // sla op wanneer favorites veranderen
    useEffect(() => {
        if (isAuth && user) {
            const key = `favorites_${user.id}`
            localStorage.setItem(key, JSON.stringify(favorites))
        }
    }, [favorites, isAuth, user])

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
