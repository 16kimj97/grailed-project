const FETCH_CURRENT = 'FETCH_CURRENT'

export const fetchCurrent = clothing => ({
    type: FETCH_CURRENT,
    payload: clothing
})

export const thunkFetchCurrent = () => async dispatch => {
    const response = await fetch('/api/clothing/user/current')
    if (response.ok) {
        const clothing = await response.json();
        dispatch(fetchCurrent(clothing))
    }
}

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_CURRENT:
            return {
                ...state,
                clothing: action.payload
            };
        default:
            return state;
    }
};

export default userReducer
