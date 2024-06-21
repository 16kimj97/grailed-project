const GET_REVIEW = 'GET_REVIEW'
const ADD_REVIEW = 'ADD_REVIEW'
const DELETE_REVIEW = 'DELETE_REVIEW';


export const getReview = (reviews, revieweeId) => ({
    type: GET_REVIEW,
    payload: { reviews, revieweeId }
});

export const addReview = review => ({
    type: ADD_REVIEW,
    payload: review
})

export const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    payload: reviewId
});


export const thunkGetReview = (revieweeId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/reviews/${revieweeId}`);

        if (!res.ok) {
            throw new Error('Failed to fetch review data');
        }

        const review = await res.json();
        dispatch(getReview(review, revieweeId));
        return review;
    } catch (error) {
        console.error('Error fetching review:', error.message);
    }
};

export const thunkAddReview = (revieweeId, Review) => async dispatch => {
    const formData = new FormData()
    formData.append('body', comment)
    const res = await fetch(`/api/reviews/${revieweeId}/new`, {
        method: 'POST',
        body: FormData
    })
    if(res.ok){
        const review = await res.json()
        dispatch (addReview(review))
        return review
    }
    else{
        return "add review error"
    }
}

export const thunkDeleteReview = (reviewId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/reviews/${reviewId}`, {
            method: 'DELETE'
        });

        if (!res.ok) {
            throw new Error('Failed to delete review');
        }

        dispatch(deleteReview(reviewId));
        return 'Review deleted successfully';
    } catch (error) {
        console.error('Error deleting review:', error.message);
        return 'Delete review error';
    }
};


const reviewReducer = (state = {}, action) => {
    let reviews, revieweeId;

    switch (action.type) {
        case GET_REVIEW:
            ({ reviews, revieweeId } = action.payload);
            return {
                ...state,
                [revieweeId]: reviews
            };
        case ADD_REVIEW:
            reviews = state[action.payload.revieweeId] || [];
            return {
                ...state,
                [action.payload.revieweeId]: [...reviews, action.payload]
            };
        case DELETE_REVIEW:
            return Object.keys(state).reduce((newState, revieweeId) => {
                newState[revieweeId] = state[revieweeId].filter(review => review.id !== action.payload);
                return newState;
            }, {});
        default:
            return state;
    }
};

export default reviewReducer;
