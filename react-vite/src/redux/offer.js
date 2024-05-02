const DELETE_OFFERS = 'DELETE_OFFERS'
const UPDATE_OFFERS = 'UPDATE_OFFERS'
const FETCH_OFFER_ID = 'FETCH_OFFER_ID'

export const updateOffers = offer => ({
    type: UPDATE_OFFERS,
    payload: offer
})

export const deleteOffers = offerId => ({
    type: DELETE_OFFERS,
    payload: offerId
})

export const fetchOfferId = offer => ({
    type: FETCH_OFFER_ID,
    payload: offer
})

export const thunkFetchOfferById = (offerId) => async dispatch => {
    const res = await fetch(`/api/offers/${offerId}`)
    // console.log(res)
    const offer = await res.json()
    dispatch(fetchOfferId(offer))
    return offer
}


export const thunkDeleteOffers = (offerId) => async dispatch => {
    const res = await fetch(`/api/offers/${offerId}`, {
        method : 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (res.ok){
        const offer = await res.json()
        dispatch(deleteOffers(offer))
        return offer
    }
}

export const thunkUpdateOffer = (offer, offerId) => async (dispatch) => {
    const res = await fetch(`/api/offers/${offerId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (res.ok) {
        const updatedOffer = await res.json();
        dispatch(updateOffers(updatedOffer));
        return updatedOffer;
    }
};


const offerReducer = (state={}, action) =>{
    switch(action.type){
        case DELETE_OFFERS: {
            const newOfferState = {...state}
            delete newOfferState[action.payload]
            return newOfferState
        }
        case UPDATE_OFFERS: {
            const editOfferState = {...state}
            editOfferState[action.payload.id] = action.payload
            return editOfferState
        }
        case FETCH_OFFER_ID:
            return {
            ...state,
            [action.payload.id]: action.payload
        }
        default:
            return state
    }
}


export default offerReducer;
