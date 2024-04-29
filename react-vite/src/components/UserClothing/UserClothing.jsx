import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkFetchCurrent } from "../../redux/user";
import { Link } from 'react-router-dom'; // Import Link
import './UserClothing.css';

const UserClothing = () => {
    const dispatch = useDispatch();
    const clothing = useSelector(state => state.user.clothing);

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
                        <img src={item.images} alt={`image for clothing item`} className="item-image" />
                    </div>
                    <div className="item-description">
                        <div className="item-title">{item.title}</div>
                        <div className="item-brand">{item.brand}</div>
                        <div className="item-size">{item.size}</div>
                    </div>
                    <Link to={`/update/${item.id}`} className="update-button">
                        Update
                    </Link>
                </div>
            ))}
        </div>
        </>
    );
}

export default UserClothing;
