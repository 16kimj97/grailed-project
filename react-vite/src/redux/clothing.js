const FETCH_CLOTHING = 'FETCH_CLOTHING'
const FETCH_CLOTHING_BY_ID = 'FETCH_CLOTHING_BY_ID'
const UPDATE_CLOTHING = 'UPDATE_CLOTHING'

export const fetchClothing = clothing => ({
    type: FETCH_CLOTHING,
    payload: clothing
})

export const fetchClothingById = clothing => ({
    type: FETCH_CLOTHING_BY_ID,
    payload: clothing
})

export const updateClothing = clothing => ({
    type: UPDATE_CLOTHING,
    payload: clothing
})


export const thunkFetchClothingById = (clothingId) => async dispatch => {
    const res = await fetch(`/api/clothing/${clothingId}`);

    if (res.ok){
        const clothing = await res.json()
        dispatch(fetchClothingById(clothing))
        return clothing
    }
}

export const thunkFetchClothing = () => async dispatch => {
    const res = await fetch('/api/clothing')

    if(res.ok){
        const clothing = await res.json()
        dispatch(fetchClothing(clothing))
    }
}

export const thunkUpdateClothing = (clothing, id) =>  async dispatch => {
    const res = await fetch(`/api/clothings/${id}`,{
        method: 'PUT',
        body: song
    })

    if (!Response.ok) {
        throw new Error('Failed to update the item')
    }

    const updatedClothing = await response.json();
    dispatch(updateClothing(updatedClothing))
    return updatedClothing
}

const clothingReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_CLOTHING: {
            const newClothingState = {...state};
            action.payload.forEach(clothes => {
                newClothingState[clothes.id] = clothes;
            });
            return newClothingState;
        }
        case FETCH_CLOTHING_BY_ID:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case UPDATE_CLOTHING: {
            const editClothingState = {...state}
            editClothingState[action.payload.id] = action.payload
            return editClothingState
        }
        default:
            return state;
    }
}

export default clothingReducer;
