const DELETE_OFFERS = 'DELETE_OFFERS'

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
