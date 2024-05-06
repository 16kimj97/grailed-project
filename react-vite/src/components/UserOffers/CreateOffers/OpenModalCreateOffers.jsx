import CreateOffer from './CreateOffers';
import OpenModalButton from '../../OpenModalButton/OpenModalButton';

const OpenModalCreate = ({ clothingId }) => {
    const onModalClose = () => {
        console.log("Modal closed");
    };

    return (
        <div>
            <OpenModalButton
                modalComponent={<CreateOffer clothingId={clothingId} onClose={onModalClose} />}
                buttonText="Create New Offer"
                onModalClose={onModalClose}
            />
        </div>
    );
};

export default OpenModalCreate;
