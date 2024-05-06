import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetReview } from '../../redux/review';
import { thunkFetchUser } from '../../redux/user';
import './Reviews.css';

const ReviewComponent = ({ revieweeId }) => {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviews[revieweeId]);
    const reviewee = useSelector(state => state.user[revieweeId]);
    const users = useSelector(state => state.user); // Accessing the entire user slice

    useEffect(() => {
        if (revieweeId) {
            dispatch(thunkFetchUser(revieweeId)); // Fetch reviewee
            dispatch(thunkGetReview(revieweeId)); // Fetch reviews
        }
    }, [dispatch, revieweeId]);

    useEffect(() => {
        reviews?.forEach(review => {
            dispatch(thunkFetchUser(review.reviewer_id)); // Fetch each reviewer
        });
    }, [dispatch, reviews]);

    const renderStarRating = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={i <= rating ? 'filled-star' : 'empty-star'}>
                    ★
                </span>
            );
        }
        return stars;
    };

    if (!reviews) {
        return <div>Loading reviews...</div>;
    }

    return (
        <div>
            <h1>Reviews</h1>
            {reviews.map((review, index) => (
                <div key={index} className="review-item">
                    <p> Reviewer: {users[review.reviewer_id]?.username}</p>
                    {/* <p> Reviewee: {reviewee.username}</p> */}
                    <p> {renderStarRating(review.rating)}</p>
                    <p>{review.comment}</p>
                    <p>{new Date(review.date_posted).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
};

export default ReviewComponent;
