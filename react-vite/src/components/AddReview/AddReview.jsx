import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunkAddReview } from '../../redux/review';

const AddReview = ({ revieweeId }) => {
    const [body, setBody] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const review = { body };
        const result = await dispatch(thunkAddReview(revieweeId, review));
        if (result === "add review error") {
            console.error('Failed to add review');
        } else {
            setBody('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="body">Review:</label>
                <textarea
                    id="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Submit Review</button>
        </form>
    );
};

export default AddReview;
