const FETCH_CLOTHING = 'FETCH_CLOTHING'
const FETCH_CLOTHING_BY_ID = 'FETCH_CLOTHING_BY_ID'
const UPDATE_CLOTHING = 'UPDATE_CLOTHING'
const DELETE_CLOTHING = 'DELETE_CLOTHING'
const CREATE_CLOTHING = 'CREATE_CLOTHING'

export const createClothing = clothing => ({
    type: CREATE_CLOTHING,
    payload: clothing
})

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

export const deleteClothing = clothingId => ({
    type: DELETE_CLOTHING,
    payload: clothingId
})

export const thunkCreateClothing = (clothing) => async dispatch => {
    const res = await fetch('/api/clothing/new',{
        method: 'POST',
        body: clothing
    })
    console.log('===========>, before await')
    if(res.ok){
        const clothing = await res.json()
        console.log("===============>, after await")
        dispatch(createClothing(clothing))
        return clothing
    }
    else {
        return "Create Error"
    }
}

export const thunkDeleteClothing = (clothingId) => async dispatch => {
    const res = await fetch(`/api/clothing/${clothingId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(res.ok){
        dispatch(deleteClothing(clothingId));
    } else {
        console.error("Delete error");
    }
}

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
    const res = await fetch(`/api/clothing/${id}`,{
        method: 'PUT',
        body: clothing
    })

    if (!res.ok) {
        throw new Error('Failed to update the item')
    }

    const updatedClothing = await res.json();
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
        case DELETE_CLOTHING: {
            const newClothingState = {...state}
            delete newClothingState[action.payload]
            return newClothingState
        }
        case CREATE_CLOTHING: {
            const newClothingState = {...state}
            newClothingState[action.payload.id] = action.payload
            return newClothingState
        }
        default:
            return state;
    }
}

export default clothingReducer;
