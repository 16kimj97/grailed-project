const DELETE_OFFERS = 'DELETE_OFFERS'
const UPDATE_OFFERS = 'UPDATE_OFFERS'

export const updateOffers = offer => ({
    type: UPDATE_OFFERS,
    payload: offer
})

export const deleteOffers = offerId => ({
    type: DELETE_OFFERS,
    payload: offerId
})

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
        body: offer
    })
    if (res.ok){
        const offer = await res.json()
        dispatch(updateOffers(offer))
        return offer
    }
}


const offerReducer = (state={}, action) =>{
    switch(action.type){
        case DELETE_OFFERS: {
            const newOfferState = {...state}
            delete newOfferState[action.payload]
            return newOfferState
        }
        default:
            return state
    }
}


export default offerReducer;
