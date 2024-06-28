import { useDispatch } from 'react-redux';
import { thunkDeleteReview } from './path-to-your-thunks';
import './DeleteConfirmationModal.css';

const DeleteConfirmationModal = ({ reviewId, onClose }) => {
    const dispatch = useDispatch();

    const handleConfirm = () => {
        dispatch(thunkDeleteReview(reviewId));
        onClose();
    };

    return (
        <div className="delete-confirmation-modal">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this review?</p>
            <button onClick={handleConfirm}>Confirm</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default DeleteConfirmationModal;
