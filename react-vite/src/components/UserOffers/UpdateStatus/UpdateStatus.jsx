import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchOfferById, thunkUpdateStatus } from '../../../redux/offer';

const UpdateStatusForm = ({ offerId, onClose }) => {
  const dispatch = useDispatch();

  const offer = useSelector(state => state.offers && state.offers[offerId]);

  // Initialize status with an empty string.
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!offer) {
      dispatch(thunkFetchOfferById(offerId));
    }
  }, [offerId, dispatch, offer]);

  useEffect(() => {
    if (offer && offer.status) {
      setStatus(offer.status);
    }
  }, [offer]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedOffer = {
      ...offer,
      status: status
    };

    await dispatch(thunkUpdateStatus(updatedOffer, offerId));
    onClose();
  };

  if (!offer) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Status:</label>
        <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
      </div>
      <button type="submit">Update Status</button>
    </form>
  );
};

export default UpdateStatusForm;
