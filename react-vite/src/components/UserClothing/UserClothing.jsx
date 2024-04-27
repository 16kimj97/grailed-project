import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import { thunkFetchCurrent } from "../../redux/user";
import './UserClothing.css'

const UserClothing = () => {
    const dispatch = useDispatch();
    const clothing = useSelector(state => state.user.clothing );
    // const [clothes, setClothes] = useState(clothing ? clothing : [])
    console.log("============>", clothing)

    useEffect(() => {
        dispatch(thunkFetchCurrent());
    }, [dispatch]);

    return (
        <>
        <div className = "user-clothing-header">
        <h1>Your Listings</h1>
        </div>
        <div className="user-clothing-container">
            {clothing?.map((item) => (
                <div key={item.id} className="clothing-item">
                    <Link to={`/clothing/${item.id}`} className="item-image-link">
                        <img src={item.images} alt={`image for clothing item`} className="item-image" />
                    </Link>
                <div className= "item-description">
                    <div className="item-title">{item.title}</div>
                    <div className="item-brand">{item.brand}</div>
                    <div className="item-size">{item.size}</div>
                </div>
                </div>
            ))}
        </div>
        </>
    );
}

export default UserClothing;
