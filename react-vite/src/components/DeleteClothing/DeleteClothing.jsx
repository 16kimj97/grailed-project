import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal'
import './DeleteClothing.css'
import { thunkDeleteClothing } from "../../redux/clothing";

function DeleteClothing({ clothingId }) {
    const { closeModal } = useModal()
    const dispatch = useDispatch()

    function cancel(){
        closeModal()
    }
    async function confirm() {
        await dispatch(thunkDeleteClothing(clothingId))
        closeModal()
    }
    return (
        <div id="deleteModal" className='delete-clothing'> {/* Updated className */}
            <h1>Do you want to delete your listing?</h1>

            <div className="confirm">
                <button id="yes" onClick={confirm}>
                    Yes
                </button>
                <button id="no" onClick={cancel}>
                    No
                </button>
            </div>
        </div>
    )
}

export default DeleteClothing
