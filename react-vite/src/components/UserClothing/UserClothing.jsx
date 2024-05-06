import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkFetchCurrent } from "../../redux/user";
import { Link } from "react-router-dom";
import './UserClothing.css';
import DeleteClothing from "../DeleteClothing/DeleteClothing";
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import OfferListByClothing from "./OfferByClothing";

const UserClothing = () => {
    const dispatch = useDispatch();
    const clothing = useSelector(state => state.user.clothing);
    const [showOffers, setShowOffers] = useState(null); // Track which item to show offers for

    useEffect(() => {
        dispatch(thunkFetchCurrent());
    }, [dispatch]);

    return (
        <>
        <div className="user-clothing-header">
            <h1>Your Listings</h1>
        </div>
        <div className="user-clothing-container">
            {clothing?.map((item) => (
                <div key={item.id} className="clothing-item">
                    <div className="item-image-link">
                        <Link to={`/clothing/${item.id}`} className="user-clothing-image">
                            <img src={item.images} alt={`Image for clothing item`} className="user-images" />
                        </Link>
                    </div>
                    <div className="item-description">
                        <div className="item-title">{item.title}</div>
                        <div className="item-brand">{item.brand}</div>
                        <div className="item-size">{item.size}</div>
                    </div>
                    <div className="button-container">
                        <button
                            onClick={() => setShowOffers(prev => prev === item.id ? null : item.id)}
                            className="offer-button"
                        >
                            {showOffers === item.id ? "Hide Offers" : "Offers"}
                        </button>

                        <button to={`/update/${item.id}`} className="update-button">
                            Update
                        </button>

                        <button className="delete-button">
                            <OpenModalMenuItem
                                itemText="Delete"
                                modalComponent={<DeleteClothing clothingId={item.id} />}
                            />
                        </button>
                    </div>

                    {showOffers === item.id && (
                        <div className="offer-list">
                            <OfferListByClothing clothingId={item.id} />
                        </div>
                    )}
                </div>
            ))}
        </div>
        </>
    );
}

export default UserClothing
