import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateClothing } from "../../redux/clothing";
import { useNavigate } from "react-router-dom";
import './CreateClothing.css';

function CreateClothing() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [size, setSize] = useState('');
    const [brand, setBrand] = useState('');
    const [condition, setCondition] = useState('');
    const [images, setImages] = useState([]);
    const [dateListed, setDateListed] = useState('');
    const [gender, setGender] = useState('');
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const user = useSelector(state => state.session['user']);

    useEffect(() => {
        if (!user) navigate('/');
    }, [navigate, user]);

    const validateForm = () => {
        const newErrors = {};
        if (!title) newErrors.title = "Title is required";
        if (!description) newErrors.description = "Description is required";
        if (!price) newErrors.price = "Price is required";
        if (!size) newErrors.size = "Size is required";
        if (!brand) newErrors.brand = "Brand is required";
        if (!condition) newErrors.condition = "Condition is required";
        if (!dateListed) newErrors.dateListed = "Date listed is required";
        if (!gender) newErrors.gender = "Gender is required";
        if (!images.length) newErrors.images = "image is required";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        setErrors(formErrors);
        setSubmitted(true);

        if (Object.keys(formErrors).length === 0) {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('size', size);
            formData.append('brand', brand);
            formData.append('condition', condition);
            formData.append('date_listed', dateListed);
            formData.append('gender', gender);
            formData.append('images', images)
            const newClothing = await dispatch(thunkCreateClothing(formData));
            if (newClothing) {
                navigate(`/clothing/${newClothing.id}`);
            }
        }
    };

    return (
        <div className="create-clothing-container">
            <h1>Create New Clothing Item</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    {submitted && errors.title && <div className="error">{errors.title}</div>}
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    {submitted && errors.description && <div className="error">{errors.description}</div>}
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                    {submitted && errors.price && <div className="error">{errors.price}</div>}
                </div>
                <div className="form-group">
                    <label>Size:</label>
                    <select value={size} onChange={(e) => setSize(e.target.value)}>
                        <option value="">Select Size</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                    {submitted && errors.size && <div className="error">{errors.size}</div>}
                </div>
                <div className="form-group">
                    <label>Brand:</label>
                    <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
                    {submitted && errors.brand && <div className="error">{errors.brand}</div>}
                </div>
                <div className="form-group">
                    <label>Condition:</label>
                    <select value={condition} onChange={(e) => setCondition(e.target.value)}>
                    <option value="">Select Condition</option>
                        <option value="New">New</option>
                        <option value="Like New">Like New</option>
                        <option value="Used">Used</option>
                        <option value="Worn">Worn</option>
                    </select>
                    {submitted && errors.condition && <div className="error">{errors.condition}</div>}
                </div>
                <div className="form-group">
                    <label>Date Listed:</label>
                    <input type="date" value={dateListed} onChange={(e) => setDateListed(e.target.value)} />
                    {submitted && errors.dateListed && <div className="error">{errors.dateListed}</div>}
                </div>
                <div className="form-group">
                    <label>Gender:</label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="">Select Gender</option>
                        <option value="Menswear">Menswear</option>
                        <option value="Womenswear">Womenswear</option>
                        <option value="Unisex">Unisex</option>
                    </select>
                    {submitted && errors.gender && <div className="error">{errors.gender}</div>}
                </div>
                <div className="form-group">
                    <label>Images:</label>
                    <input type="text" value={images} onChange={(e) => setImages(e.target.value)} />
                    {submitted && errors.images && <div className="error">{errors.images}</div>}
                </div>
                <button type="submit">Create Clothing Item</button>
            </form>
        </div>
    );
}

export default CreateClothing;
