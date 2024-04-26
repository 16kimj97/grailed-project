const FETCH_CLOTHING = 'FETCH_CLOTHING'
const FETCH_CLOTHING_BY_ID = 'FETCH_CLOTHING_BY_ID'

export const fetchClothing = clothing => ({
    type: FETCH_CLOTHING,
    payload: clothing
})

export const fetchClothingById = clothing => ({
    type: FETCH_CLOTHING_BY_ID,
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
        default:
            return state;
    }
}

export default clothingReducer;
