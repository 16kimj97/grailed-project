import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchOfferByClothing } from '../../redux/offer';
import { useModal } from '../../context/Modal';
import UpdateStatusForm from '../UserOffers/UpdateStatus/UpdateStatus';
import './OfferByClothing.css';

const OfferListByClothing = ({ clothingId }) => {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();

  useEffect(() => {
    if (clothingId) {
      dispatch(thunkFetchOfferByClothing(clothingId));
    }
  }, [dispatch, clothingId]);

  const offers = useSelector(state => state.offers.offers);

  const handleUpdateStatus = (offerId) => {
    const modalContent = <UpdateStatusForm offerId={offerId} onClose={() => setModalContent(null)} />;
    setModalContent(modalContent);
  };

  return (
    <div className="offers-container">
      <h2 className="offers-heading">Offers</h2>
      {offers.length === 0 ? (
        <p>No offers yet</p>
      ) : (
        <ul className="offers-list">
          {offers.map(offer => (
            <li key={offer.id} className="offer-item">
              <p className="offer-price">Offer Price: {offer.offer_price}</p>
              <p className="offer-shipping">Shipping Details: {offer.shipping_details}</p>
              <p className="offer-status">Status: {offer.status}</p>
              <button onClick={() => handleUpdateStatus(offer.id)}>Update Status</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OfferListByClothing;
