const FETCH_CURRENT = 'FETCH_CURRENT'
const LOAD_USER = 'user/loadUser';
const FETCH_OFFERS = 'FETCH_OFFERS'

export const fetchCurrent = clothing => ({
    type: FETCH_CURRENT,
    payload: clothing
})

export const fetchOffers = offers => ({
    type: FETCH_OFFERS,
    payload: offers
})

export const loadUser = user => ({
    type: LOAD_USER,
    payload: user
});


export const thunkFetchCurrent = () => async dispatch => {
    const response = await fetch('/api/clothing/user/current')
    if (response.ok) {
        const clothing = await response.json();
        dispatch(fetchCurrent(clothing))
    }
}

export const thunkFetchUser = (id) => async dispatch => {
    try {
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }
        const user = await response.json();
        dispatch(loadUser(user));
    } catch (error) {
        console.error('Error fetching user:', error);
    }
};


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
        case FETCH_CURRENT: {
            return {
                ...state,
                clothing: action.payload
            };
        }
        case FETCH_OFFERS: {
            return {
                 ...state,
                 offers: action.payload
            };
        }
        case LOAD_USER: {
            const user = action.payload;
            return {
                ...state,
                [user.id]: user
            };
        }
        default:
            return state;
    }
};

export default userReducer
