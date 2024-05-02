import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkFetchOffers } from "../../redux/user";
import { thunkFetchClothingById } from "../../redux/clothing";
import { Link } from "react-router-dom";
import './UserOffers.css'
import DeleteOffers from "./DeleteOffers/DeleteOffers";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";

const UserOffers = () => {
    const dispatch = useDispatch();
    const offers = useSelector(state => state.user.offers);
    const clothing = useSelector(state => state.clothing);

    useEffect(() => {
        dispatch(thunkFetchOffers());
    }, [dispatch]);

    useEffect(() => {
        if (offers) {
            offers.forEach(offer => dispatch(thunkFetchClothingById(offer.clothing_id)));
        }
    }, [offers, dispatch]);


    return (
        <div className="user-offers">
            <h2 className="offers-heading">Sent Offers</h2>
            <div className="offers-list">
                {offers && offers.map(offer => (
                    <div key={offer.id} className="offer-item">
                        <p>Offer Price: {offer.offer_price}</p>
                        <p>Shipping Details: {offer.shipping_details}</p>
                        <p>Status: {offer.status}</p>

                        {clothing[offer.clothing_id] && (
                            <div className="clothing-details">
                                <p>{clothing[offer.clothing_id].description}</p>
                                <div className="clothing-info">
                                    <span>Size: {clothing[offer.clothing_id].size}</span>
                                    <span>Brand: {clothing[offer.clothing_id].brand}</span>
                                    <span>Condition: {clothing[offer.clothing_id].condition}</span>
                                </div>
                                <div className="clothing-price">
                                    Price: ${clothing[offer.clothing_id].price}
                                </div>
                                {clothing[offer.clothing_id].images && (
                                    <Link to={`/clothing/${offer.clothing_id}`} className="item-image-link">
                                        <img src={clothing[offer.clothing_id].images} alt={clothing[offer.clothing_id].title} />
                                    </Link>
                                )}
                                <div className="clothing-date">
                                    Listed on: {new Date(clothing[offer.clothing_id].date_listed).toLocaleDateString()}
                                </div>
                            </div>
                        )}

                        <div className="buttons-container">
                            <button className="delete-offer-button">
                                <OpenModalMenuItem
                                    itemText="Delete"
                                    modalComponent={<DeleteOffers offerId={offer.id} />}
                                />
                            </button>
                            <button to={`/update-offer/${offer.id}`} className="update-offer-button">
                            Update
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserOffers;
