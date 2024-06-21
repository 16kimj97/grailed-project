import { useDispatch, useSelector } from 'react-redux';
import { thunkGetReview, thunkDeleteReview } from './path-to-your-thunks';
import './ReviewList.css';

const ReviewList = ({ revieweeId }) => {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviews[revieweeId] || []);

    useEffect(() => {
        dispatch(thunkGetReview(revieweeId));
    }, [dispatch, revieweeId]);

    const handleDelete = (reviewId) => {
        dispatch(thunkDeleteReview(reviewId));
    };

    return (
        <div>
            <h2>Reviews</h2>
            {reviews.length === 0 ? (
                <p>No reviews available.</p>
            ) : (
                <ul>
                    {reviews.map((review) => (
                        <li key={review.id}>
                            <p>{review.body}</p>
                            <button onClick={() => handleDelete(review.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReviewList;
