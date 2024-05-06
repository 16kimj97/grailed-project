import './ClothingTile.css'

const ClothingTile = ({ clothes }) => {
    return (
        <div className="clothing-tile">
            {clothes.images && (
                <img src={clothes.images} alt={clothes.title} />
            )}
            <div className="date-container">
                <div className="clothing-date">
                    Listed on: {new Date(clothes.date_listed).toLocaleDateString()}
                </div>
            </div>
            <div className="clothing-info">
                <div className="brand-size">
                    <p><strong></strong> {clothes.brand}</p>
                    <p><strong></strong> {clothes.size}</p>
                </div>
                <p>{clothes.title}</p>
                <p><strong></strong> ${clothes.price}</p>
            </div>
        </div>
    );
};

export default ClothingTile;
