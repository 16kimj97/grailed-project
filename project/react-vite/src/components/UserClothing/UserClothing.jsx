import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import { thunkFetchCurrent } from "../../redux/user";

const UserClothing = () => {
    const dispatch = useDispatch();
    const clothing = useSelector(state => state.user.clothing );
    // const [clothes, setClothes] = useState(clothing ? clothing : [])
    console.log("============>", clothing)

    useEffect(() => {
        dispatch(thunkFetchCurrent());
    }, [dispatch]);

    return (
        <div className="user-clothing-container">
            {clothes.map((item) => (
                <div key={item.id} className="clothing-item">
                    <h3>{item.title}</h3>
                    <img src={item.images} alt={`image for clothing item`} />
                    <p>Brand: {item.brand}</p>
                    <p>Size: {item.size}</p>
                    <Link to={`/clothing/${item.id}`}>View Details</Link>
                </div>
            ))}
        </div>
    );
}

export default UserClothing;
