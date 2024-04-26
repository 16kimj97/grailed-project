import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchClothing } from '../../redux/clothing';
import ClothingTile from './ClothingTile';
import './ClothingList.css'
import { Link } from 'react-router-dom'


const ClothingList = () => {
    const dispatch = useDispatch();
    const clothing = useSelector(state => Object.values(state.clothing));

    useEffect(() => {
        dispatch(thunkFetchClothing());
    }, [dispatch]);

    return (
        <div className="clothing-list">
            {clothing.length ? (
                clothing.map(clothes => (
                    <Link to={`/clothing/${clothes.id}`} key={clothes.id}>
                        <ClothingTile clothes={clothes} />
                    </Link>
                ))
            ) : (
                <p>Loading clothing...</p>
            )}
        </div>
    );
};


export default ClothingList
