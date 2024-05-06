import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunkCreateOffer } from '../../../redux/offer';
import './CreateOffers.css';

const CreateOffer = ({ clothingId }) => {
    const dispatch = useDispatch();

    const [offerPrice, setOfferPrice] = useState('');
    const [shippingDetails, setShippingDetails] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('clothing_id', clothingId);
        formData.append('offer_price', parseFloat(offerPrice));
        formData.append('shipping_details', shippingDetails);

        try {
            await dispatch(thunkCreateOffer(formData));
            alert('Offer created successfully!');
            setOfferPrice('');
            setShippingDetails('');
        } catch (error) {
            console.error('Error creating offer:', error);
            alert('An error occurred while creating the offer.');
        }
    };

    return (
        <div className="create-offer">
            <h3>Create a New Offer</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Offer Price:</label>
                    <input
                        type="number"
                        value={offerPrice}
                        onChange={(e) => setOfferPrice(e.target.value)}
                        placeholder="Enter your offer price"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Shipping Details:</label>
                    <textarea
                        value={shippingDetails}
                        onChange={(e) => setShippingDetails(e.target.value)}
                        placeholder="Enter shipping details"
                        required
                    />
                </div>

                <button type="submit">Submit Offer</button>
            </form>
        </div>
    );
};

export default CreateOffer;
