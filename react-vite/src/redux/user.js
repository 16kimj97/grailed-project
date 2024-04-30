const FETCH_CURRENT = 'FETCH_CURRENT'

const FETCH_OFFERS = 'FETCH_OFFERS'

export const fetchCurrent = clothing => ({
    type: FETCH_CURRENT,
    payload: clothing
})

export const fetchOffers = offers => ({
    type: FETCH_OFFERS,
    payload: offers
})

export const thunkFetchCurrent = () => async dispatch => {
    const response = await fetch('/api/clothing/user/current')
    if (response.ok) {
        const clothing = await response.json();
        dispatch(fetchCurrent(clothing))
    }
}

export const thunkFetchOffers = () => async dispatch => {
    const response = await fetch('/api/offers/current')
    if(response.ok) {
        const offers = await response.json();
        console.log("response", response)
        dispatch(fetchOffers(offers))
    }
}


const userReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_CURRENT:
            return {
                ...state,
                clothing: action.payload
            };
        case FETCH_OFFERS:
            return {
                 ...state,
                 offers: action.payload
            }

        default:
            return state;
    }
};

export default userReducer
