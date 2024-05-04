const DELETE_OFFERS = 'DELETE_OFFERS'
const UPDATE_OFFERS = 'UPDATE_OFFERS'
const FETCH_OFFER_ID = 'FETCH_OFFER_ID'
const FETCH_OFFER_BY_CLOTHING = 'FETCH_OFFER_BY_CLOTHING'
const CREATE_OFFER = 'CREATE_OFFER'

export const updateOffers = offer => ({
    type: UPDATE_OFFERS,
    payload: offer
})

export const createOffer = offer => ({
    type: CREATE_OFFER,
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

export const fetchOfferByClothing = (offers) => ({
    type: FETCH_OFFER_BY_CLOTHING,
    payload: offers
});

export const thunkCreateOffer = (offer) => async dispatch => {
    const res = await fetch('/api/offers/new', {
        method: 'POST',
        body: offer
    })
    if(res.ok){
        const offer = await res.json();
        dispatch(createOffer(offer))
        return offer
    }
    else {
        const error = await res.json();
        console.error("Error:", error);
    }
}

export const thunkFetchOfferByClothing = (clothingId) => async dispatch => {
        const res = await fetch(`/api/offers/clothing/${clothingId}`);

        const offer = await res.json();
        dispatch(fetchOfferByClothing(offer));
        return offer;
};

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
        body: JSON.stringify(offer)
    });

    if (res.ok) {
        const updatedOffer = await res.json();
        dispatch(updateOffers(updatedOffer));
        return updatedOffer;
    } else {
        const error = await res.json();
        console.error("Error:", error);
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
        case FETCH_OFFER_BY_CLOTHING: {
            const newState = {...state};
            const clothingId = action.payload[0].clothing_id;
            newState[clothingId] = action.payload;
            return newState
            }
        case CREATE_OFFER: {
            const newOfferState = {...state}
            newOfferState[action.payload.id] = action.payload
            return newOfferState
        }
        default:
            return state
    }
}


export default offerReducer;
