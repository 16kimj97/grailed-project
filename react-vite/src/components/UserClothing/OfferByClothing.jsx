import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchOfferByClothing } from '../../redux/offer';
import './OfferByClothing.css';

const OfferListByClothing = ({ clothingId }) => {
  const dispatch = useDispatch();
  const offers = useSelector(state => state.offers[clothingId]);

  useEffect(() => {
    if (clothingId) {
      dispatch(thunkFetchOfferByClothing(clothingId));
    }
  }, [dispatch, clothingId]);

  return (
    <div className="offers-container">
      <h2 className="offers-heading">Offers</h2>
      <ul className="offers-list">
        {offers && offers.map(offer => (
          <li key={offer.id} className="offer-item">
                <p className="offer-price">Offer Price: {offer.offer_price}</p>
                <p className="offer-shipping">Shipping Details: {offer.shipping_details}</p>
                <p className="offer-status">Status: {offer.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OfferListByClothing;
