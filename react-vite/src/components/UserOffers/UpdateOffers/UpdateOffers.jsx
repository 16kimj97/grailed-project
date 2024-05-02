import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './UpdateOffers.css';
import { thunkFetchOfferById, thunkUpdateOffer } from '../../../redux/offer';

const UpdateOffers = () => {
    const { offerId } = useParams();
    const parsedId = parseInt(offerId);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const offer = useSelector(state => state.offers[parsedId]);

    const [offerPrice, setOfferPrice] = useState('');
    const [shippingDetails, setShippingDetails] = useState('');


    useEffect(() => {
        if (parsedId) {
            dispatch(thunkFetchOfferById(parsedId));
        }
    }, [parsedId, dispatch]);

    useEffect(() => {
        if (offer) {
            setOfferPrice(offer.offer_price);
            setShippingDetails(offer.shipping_details);
        }
    }, [offer]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedOffer = {
            offer_price: offerPrice,
            shipping_details: shippingDetails,
        };
        await dispatch(thunkUpdateOffer(updatedOffer, parsedId));
        navigate(`/current/offers`);
    };


    return (
        <div className="update-offers-container">
            <h1>Update Offer</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Offer Price:</label>
                    <input type="number" value={offerPrice} onChange={(e) => setOfferPrice(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Shipping Details:</label>
                    <textarea value={shippingDetails} onChange={(e) => setShippingDetails(e.target.value)} />
                </div>

                <button type="submit">Update Offer</button>
            </form>
        </div>
    );
}

export default UpdateOffers;
