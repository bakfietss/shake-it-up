import api from '../../helpers/api'

export const DEBOUNCE_DELAY = 400
export const DEFAULT_LETTER = 'a'

export async function fetchByLetter(letter) {
    const res = await api.get(`/search.php?f=${letter}`)
    return res.data.drinks || []
}

export async function searchByName(query) {
    const res = await api.get(`/search.php?s=${query}`)
    return res.data.drinks || []
}

export async function searchByCategory(category) {
    const res = await api.get(`/filter.php?c=${category}`)
    return res.data.drinks || []
}

export async function searchByIngredient(ingredient) {
    const res = await api.get(`/filter.php?i=${ingredient}`)
    return res.data.drinks || []
}

export async function fetchFilterOptions() {
    const [catRes, ingRes, glassRes] = await Promise.all([
        api.get('/list.php?c=list'),
        api.get('/list.php?i=list'),
        api.get('/list.php?g=list')
    ])
    return {
        categories: catRes.data.drinks || [],
        ingredients: ingRes.data.drinks || [],
        glasses: glassRes.data.drinks || []
    }
}
