import { useDispatch } from "react-redux"
import { useModal } from "../../../context/Modal"
import './DeleteOffers.css'
import { thunkDeleteOffers } from "../../../redux/offer"

function DeleteOffers({offerId}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    console.log("=============>", offerId)

    function cancel(){
        closeModal()
    }
    async function confirm() {
        await dispatch(thunkDeleteOffers(offerId))
        closeModal()
        window.location.reload();
    }

    return (
        <div id ="deleteModal" className='delete-offers'>
            <h1>Do you want to delete your listing?</h1>

            <div className="confirm-offer">
                <button id="accept-offer" onClick={confirm}>
                    Yes
                </button>
                <button id="decline-offer" onClick={cancel}>
                    No
                </button>
            </div>
        </div>
    )
}

export default DeleteOffers
