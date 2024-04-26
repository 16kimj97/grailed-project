import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkFetchClothingById } from '../../redux/clothing';
import './ClothingDetails.css';

const ClothingDetails = () => {
    const { clothingId } = useParams();
    const dispatch = useDispatch();
    const parsedId = parseInt(clothingId)

    useEffect(() => {
        if (clothingId) {
            dispatch(thunkFetchClothingById(parsedId));
        }
    }, [dispatch, clothingId, parsedId]);

    const clothing = useSelector(state => state.clothing[parsedId]);

    if (!clothing) {
        return <div className="clothing-loading">Loading...</div>;
    }

    return (
        <div className="clothing-details">
            <div className="clothing-header">
                <h2>{clothing.title}</h2>
                <span className="clothing-status">{clothing.status}</span>
            </div>
            <div className="clothing-body">
                <p>{clothing.description}</p>
                <div className="clothing-info">
                    <span>Size: {clothing.size}</span>
                    <span>Brand: {clothing.brand}</span>
                    <span>Condition: {clothing.condition}</span>
                </div>
                <div className="clothing-price">
                    Price: ${clothing.price}
                </div>
                {clothing.images && <img src={clothing.images} alt={clothing.title} />}
                <div className="clothing-date">
                    Listed on: {new Date(clothing.date_listed).toLocaleDateString()}
                </div>
            </div>
        </div>
    );
};

export default ClothingDetails;
