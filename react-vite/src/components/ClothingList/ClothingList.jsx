import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { thunkFetchClothing } from '../../redux/clothing';
import ClothingCategory from './ClothingCategory';
import { Routes, Route, Link } from 'react-router-dom';
import './ClothingList.css';
import homeImg from '../../images/homepage.jpg';

const ClothingList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkFetchClothing());
    }, [dispatch]);

    return (
        <div className="clothing-list">
            <img src={homeImg} className="clothing-image" alt="Homepage" />

        <div className="image-text-overlay">
            The Platform for Style
            </div>

            <nav className="category-nav">
                <Link to="/clothing/menswear">Menswear</Link>
                <Link to="/clothing/womenswear">Womenswear</Link>
                <Link to="/clothing/unisex">Unisex</Link>
            </nav>

            <Routes>
                <Route path="menswear" element={<ClothingCategory gender="Menswear" />} />
                <Route path="womenswear" element={<ClothingCategory gender="Womenswear" />} />
                <Route path="unisex" element={<ClothingCategory gender="Unisex" />} />
            </Routes>
        </div>
    );
};

export default ClothingList;
