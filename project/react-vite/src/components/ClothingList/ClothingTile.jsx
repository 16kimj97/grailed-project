import './ClothingTile.css'

const ClothingTile = ({ clothes }) => {
    return (
        <div className="clothing-tile">
            <h3>{clothes.title}</h3>
            {clothes.images && (
                <img src={clothes.images} alt={clothes.title} style={{ maxWidth: '100%' }} />
            )}
            <p><strong>Brand:</strong> {clothes.brand}</p>
            <p><strong>Size:</strong> {clothes.size}</p>
            <p><strong>Condition:</strong> {clothes.condition}</p>
            <p><strong>Price:</strong> ${clothes.price}</p>
        </div>
    );
};

export default ClothingTile;
