import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchClothingById, thunkUpdateClothing, thunkFetchClothing } from '../../redux/clothing';
import './UpdateClothing.css';
import { ToastContainer, toast } from "react-toastify";

const UpdateClothing = () => {
    const { clothingId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const parsedId = parseInt(clothingId);
    const clothing = useSelector(state => state.clothing[parsedId]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [size, setSize] = useState('');
    const [brand, setBrand] = useState('');
    const [condition, setCondition] = useState('');
    const [images, setImages] = useState('');
    const [dateListed, setDateListed] = useState('');
    const [status, setStatus] = useState('');
    const [offers, setOffers] = useState('');
    const [error, setError] = useState({});

    useEffect(() => {
        if (parsedId) {
            dispatch(thunkFetchClothingById(parsedId));
        }
    }, [dispatch, parsedId]);

    useEffect(() => {
        if (clothing) {
            setTitle(clothing.title || '');
            setDescription(clothing.description || '');
            setPrice(clothing.price || '');
            setSize(clothing.size || '');
            setBrand(clothing.brand || '');
            setCondition(clothing.condition || '');
            setImages(clothing.images || '');
            setDateListed(clothing.date_listed || '');
            setStatus(clothing.status || '');
            setOffers(clothing.offers || '');
        }
    }, [clothing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'title':
                setTitle(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'price':
                setPrice(value);
                break;
            case 'size':
                setSize(value);
                break;
            case 'brand':
                setBrand(value);
                break;
            case 'condition':
                setCondition(value);
                break;
            case 'images':
                setImages(value);
                break;
            case 'date_listed':
                setDateListed(value);
                break;
            case 'status':
                setStatus(value);
                break;
            case 'offers':
                setOffers(value);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        const errObj = {}
        if (!title.length) errObj.title = "Title required";
        if (!description.length) errObj.description = "Description required";
        if (!price) errObj.price = "Price required";
        if (!size.length) errObj.size = "Size required";
        if (!brand.length) errObj.brand = "Brand required";
        if (!condition.length) errObj.condition = "Condition required";
        if (!dateListed) errObj.dateListed = "Date listed required";
        if (!status.length) errObj.status = "Status required";
        if (!offers.length) errObj.offers = "Offers required";

        setError(errObj);
    }, [title, description, price, size, brand, condition, dateListed, status, offers]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(error).length === 0) {
            const updatedClothing = await dispatch(thunkUpdateClothing({
                id: parsedId,
                title,
                description,
                price,
                size,
                brand,
                condition,
                images,
                date_listed: dateListed,
                status,
                offers
            }));
            dispatch(thunkFetchClothing());
            toast.success("Successfully updated clothing", {
                onClose: () => navigate(`/`)
            });
        } else {
            toast.error("Please fill in all the required fields.");
        }
    };

    return (
        <div className="update-clothing-form">
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" value={title} onChange={handleChange} />
                {error.title && <span className="error">{error.title}</span>}

                <label htmlFor="description">Description:</label>
                <input type="text" id="description" name="description" value={description} onChange={handleChange} />
                {error.description && <span className="error">{error.description}</span>}

                <label htmlFor="price">Price:</label>
                <input type="text" id="price" name="price" value={price} onChange={handleChange} />
                {error.price && <span className="error">{error.price}</span>}

                <label htmlFor="size">Size:</label>
                <input type="text" id="size" name="size" value={size} onChange={handleChange} />
                {error.size && <span className="error">{error.size}</span>}

                <label htmlFor="brand">Brand:</label>
                <input type="text" id="brand" name="brand" value={brand} onChange={handleChange} />
                {error.brand && <span className="error">{error.brand}</span>}

                <label htmlFor="condition">Condition:</label>
                <input type="text" id="condition" name="condition" value={condition} onChange={handleChange} />
                {error.condition && <span className="error">{error.condition}</span>}

                <label htmlFor="images">Images:</label>
                <input type="text" id="images" name="images" value={images} onChange={handleChange} />
                {error.images && <span className="error">{error.images}</span>}

                <label htmlFor="date_listed">Date Listed:</label>
                <input type="text" id="date_listed" name="date_listed" value={dateListed} onChange={handleChange} />
                {error.dateListed && <span className="error">{error.dateListed}</span>}

                <label htmlFor="status">Status:</label>
                <input type="text" id="status" name="status" value={status} onChange={handleChange} />
                {error.status && <span className="error">{error.status}</span>}

                <label htmlFor="offers">Offers:</label>
                <input type="text" id="offers" name="offers" value={offers} onChange={handleChange} />
                {error.offers && <span className="error">{error.offers}</span>}

                <button type="submit">Update Clothing</button>
            </form>
        </div>
    );
};

export default UpdateClothing;
