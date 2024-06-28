import { useDispatch, useSelector } from 'react-redux';
import { thunkGetReview } from './path-to-your-thunks';
import OpenModalButton from '../../context/OpenModalButton';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import './ReviewList.css';

const ReviewList = ({ revieweeId }) => {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviews[revieweeId] || []);

    useEffect(() => {
        dispatch(thunkGetReview(revieweeId));
    }, [dispatch, revieweeId]);

    return (
        <div className="review-list">
            <h2>Reviews</h2>
            {reviews.length === 0 ? (
                <p>No reviews available.</p>
            ) : (
                <ul>
                    {reviews.map((review) => (
                        <li key={review.id}>
                            <p>{review.body}</p>
                            <OpenModalButton
                                buttonText="Delete"
                                modalComponent={
                                    <DeleteConfirmationModal
                                        reviewId={review.id}
                                        onClose={() => setModalContent(null)}
                                    />
                                }
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReviewList;
