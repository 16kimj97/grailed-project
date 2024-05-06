const GET_REVIEW = 'GET_REVIEW'

export const getReview = (reviews, revieweeId) => ({
    type: GET_REVIEW,
    payload: { reviews, revieweeId }
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


const reviewReducer = (state = {}, action) => {
    let reviews, revieweeId;

    switch (action.type) {
        case GET_REVIEW:
            ({ reviews, revieweeId } = action.payload);
            return {
                ...state,
                [revieweeId]: reviews
            };
        default:
            return state;
    }
};

export default reviewReducer;
