import { createContext, useState, useEffect, useContext, useCallback } from 'react'
import axios from 'axios'
import { AuthContext } from './AuthContext'

export const FavoritesContext = createContext({})

export function useFavorites() {
    return useContext(FavoritesContext)
}

const NOVI_API = 'https://novi-backend-api-wgsgz.ondigitalocean.app/api'
const NOVI_PROJECT_ID = '667e832d-8201-4580-afa3-87aecee36a78'

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([])
    const { isAuth, user } = useContext(AuthContext)

    const getAuthHeader = () => {
        const token = localStorage.getItem('token')
        return {
            'Content-Type': 'application/json',
            'novi-education-project-id': NOVI_PROJECT_ID,
            'Authorization': `Bearer ${token}`
        }
    }

    const fetchFavorites = useCallback(async () => {
        if (!isAuth || !user) {
            setFavorites([])
            return
        }

        try {
            const response = await axios.get(`${NOVI_API}/favorites`, {
                headers: getAuthHeader()
            })

            const allFavorites = response.data || []

            const userFavorites = allFavorites.filter(fav =>
                String(fav.userId) === String(user.id)
            ).map(fav => ({
                ...fav,
                idDrink: fav.cocktailId,
                strDrink: fav.cocktailName,
                strDrinkThumb: fav.cocktailImage
            }))

            setFavorites(userFavorites)
        } catch (e) {
            console.log('favorieten ophalen mislukt', e)
            setFavorites([])
        }
    }, [isAuth, user])

    useEffect(() => {
        fetchFavorites()
    }, [fetchFavorites])

    async function addFavorite(cocktail) {
        if (!isAuth) return false

        try {
            const favoriteData = {
                userId: user.id,
                cocktailId: cocktail.idDrink,
                cocktailName: cocktail.strDrink,
                cocktailImage: cocktail.strDrinkThumb,
                cocktailCategory: cocktail.strCategory || null,
                cocktailAlcoholic: cocktail.strAlcoholic || null,
                cocktailGlass: cocktail.strGlass || null
            }

            const response = await axios.post(`${NOVI_API}/favorites`, favoriteData, {
                headers: getAuthHeader()
            })

            const newFavorite = {
                ...favoriteData,
                id: response.data.id,
                idDrink: cocktail.idDrink,
                strDrink: cocktail.strDrink,
                strDrinkThumb: cocktail.strDrinkThumb,
                strCategory: cocktail.strCategory,
                strAlcoholic: cocktail.strAlcoholic,
                strGlass: cocktail.strGlass
            }
            setFavorites(prev => [...prev, newFavorite])
            return true
        } catch (err) {
            console.log('toevoegen mislukt', err)
            return false
        }
    }

    async function removeFavorite(cocktailId) {
        if (!isAuth) return false

        const favorite = favorites.find(fav =>
            fav.cocktailId === cocktailId || fav.idDrink === cocktailId
        )

        if (!favorite || !favorite.id) return false

        try {
            await axios.delete(`${NOVI_API}/favorites/${favorite.id}`, {
                headers: getAuthHeader()
            })

            setFavorites(prev => prev.filter(fav => fav.id !== favorite.id))
            return true
        } catch (e) {
            console.log('verwijderen mislukt', e)
            return false
        }
    }

    async function toggleFavorite(cocktail) {
        const cocktailId = cocktail.idDrink || cocktail.cocktailId
        if (isFavorite(cocktailId)) {
            return await removeFavorite(cocktailId)
        } else {
            return await addFavorite(cocktail)
        }
    }

    function isFavorite(idDrink) {
        return favorites.some(fav =>
            fav.cocktailId === idDrink || fav.idDrink === idDrink
        )
    }

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    )
}
