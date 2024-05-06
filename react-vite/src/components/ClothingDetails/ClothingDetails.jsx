import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkFetchClothingById } from '../../redux/clothing';
import OpenModalCreate from '../UserOffers/CreateOffers/OpenModalCreateOffers';
import './ClothingDetails.css';
import ReviewComponent from '../Reviews/Reviews';

const ClothingDetails = () => {
    const { clothingId } = useParams();
    const dispatch = useDispatch();
    const parsedId = parseInt(clothingId);

    useEffect(() => {
        if (clothingId) {
            dispatch(thunkFetchClothingById(parsedId));
        }
    }, [dispatch, clothingId, parsedId]);

    const clothing = useSelector(state => state.clothing[parsedId]);
    const currentUser = useSelector(state => state.session.user);

    if (!clothing) {
        return <div className="clothing-details-loading">Loading...</div>;
    }

    return (
        <div className="clothing-details">
            <h2 className="clothing-details-title">{clothing.title}</h2>
            {clothing.images && <img className="clothing-details-image" src={clothing.images} alt={clothing.title} />}
            <div className="date-container">
                <div className="clothing-details-date">
                    Listed on: {new Date(clothing.date_listed).toLocaleDateString()}
                </div>
            </div>

            <div className="clothing-details-body">
                <p>{clothing.description}</p>
                <div className="clothing-details-info">
                    <span>Size: {clothing.size}</span>
                    <span>Brand: {clothing.brand}</span>
                    <span>Condition: {clothing.condition}</span>
                </div>
                <div className="clothing-details-price">
                    Price: ${clothing.price}
                </div>
            </div>

            {currentUser && currentUser.id !== clothing.user_id && (
                <div className="create-offer-button">
                    <OpenModalCreate clothingId={clothingId} />
                </div>
            )}

        <ReviewComponent revieweeId={clothing.user_id} />
        </div>
    );
};

export default ClothingDetails;
