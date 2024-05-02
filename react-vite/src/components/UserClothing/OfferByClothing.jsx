import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchOfferByClothing } from '../../redux/offer';
import { useParams } from 'react-router-dom';

const OfferListByClothing = () => {
  const { clothingId } = useParams(); // Extract clothingId from URL params
  const parsedId = parseInt(clothingId); // Parse clothingId into an integer
  console.log("============>", parsedId)
  const dispatch = useDispatch();
  const offers = useSelector(state => state.offers[parsedId]);
  console.log("===========> offers", offers)

  useEffect(() => {
    dispatch(thunkFetchOfferByClothing(parsedId));
  }, [dispatch, parsedId]);

  return (
    <div>
      <h2>Offers</h2>
      <ul>
        {offers && offers.map(offer => (
          <li key={offer.id}>
                <p>Offer Price: {offer.offer_price}</p>
                <p>Shipping Details: {offer.shipping_details}</p>
                <p>Status: {offer.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OfferListByClothing;
