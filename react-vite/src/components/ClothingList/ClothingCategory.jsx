import { useSelector } from 'react-redux';
import ClothingTile from './ClothingTile';
import './ClothingCategory.css';
import { Link } from 'react-router-dom';

const ClothingCategory = ({ gender }) => {
    const clothing = useSelector(state => Object.values(state.clothing).filter(item => item.gender === gender));

    return (
        <div className="clothing-category">
            {clothing.length ? (
                clothing.map(clothes => (
                    <Link to={`/clothing/${clothes.id}`} key={clothes.id}>
                        <ClothingTile clothes={clothes} />
                    </Link>
                ))
            ) : (
                <p>No clothing found for {gender}...</p>
            )}
        </div>
    );
};

export default ClothingCategory
