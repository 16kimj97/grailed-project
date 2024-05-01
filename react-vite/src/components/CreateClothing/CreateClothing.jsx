import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateClothing } from "../../redux/clothing";
import { useNavigate } from "react-router-dom";
import './CreateClothing.css'

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
    const [error, setError] = useState({});

    const user = useSelector(state => state.session['user']);

    useEffect(() => {
        if (!user) navigate('/');
    }, [navigate, user]);

    useEffect(() => {
        const errObj = {};
        if (!title.length) errObj.title = "Title required";
        if (!description.length) errObj.description = "Description required";
        if (!price) errObj.price = "Price required";
        if (!size.length) errObj.size = "Size required";
        if (!brand.length) errObj.brand = "Brand required";
        if (!condition.length) errObj.condition = "Condition required";
        if (!dateListed) errObj.dateListed = "Date listed required";
        if (!gender) errObj.gender = "Gender required";  // Check if gender is provided
        if (!images.length) errObj.images = "At least one image required";
        setError(errObj);
    }, [title, description, price, size, brand, condition, dateListed, gender, images]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(error).length === 0) {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('size', size);
            formData.append('brand', brand);
            formData.append('condition', condition);
            formData.append('date_listed', dateListed);
            formData.append('gender', gender);  // Append gender to form data
            images.forEach((img, index) => formData.append('images', img));

            const newClothing = await dispatch(thunkCreateClothing(formData));
            navigate(`/clothing/${newClothing.id}`);
        } else {
            console.log("Form validation errors:", error);
        }
    };

    return (
        <div className="create-clothing-container">
            <h1>Create New Clothing Item</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    {error.title && <div className="error">{error.title}</div>}
                </div>

                <div className="form-group">
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    {error.description && <div className="error">{error.description}</div>}
                </div>

                <div className="form-group">
                    <label>Price:</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                    {error.price && <div className="error">{error.price}</div>}
                </div>

                <div className="form-group">
                    <label>Size:</label>
                    <select id="size" name="size" value={size} onChange={(e) => setSize(e.target.value)}>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                    {error.size && <div className="error">{error.size}</div>}
                </div>

                <div className="form-group">
                    <label>Brand:</label>
                    <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
                    {error.brand && <div className="error">{error.brand}</div>}
                </div>

                <div className="form-group">
                    <label>Condition:</label>
                    <select id="condition" name="condition" value={condition} onChange={(e) => setCondition(e.target.value)}>
                        <option value="New">New</option>
                        <option value="Like New">Like New</option>
                        <option value="Used">Used</option>
                        <option value="Worn">Worn</option>
                    </select>
                    {error.condition && <div className="error">{error.condition}</div>}
                </div>

                <div className="form-group">
                    <label>Date Listed:</label>
                    <input type="date" value={dateListed} onChange={(e) => setDateListed(e.target.value)} />
                    {error.dateListed && <div className="error">{error.dateListed}</div>}
                </div>

                <div className="form-group">
                    <label>Gender:</label>
                    <select id="gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="Menswear">Menswear</option>
                        <option value="Womenswear">Womenswear</option>
                        <option value="Unisex">Unisex</option>
                    </select>
                    {error.gender && <div className="error">{error.gender}</div>}
                </div>

                <div className="form-group">
                    <label>Images:</label>
                    <input type="text" onChange={(e) => setImages([e.target.value])} />
                    {error.images && <div className="error">{error.images}</div>}
                </div>

                <button type="submit">Create Clothing Item</button>
            </form>
        </div>
    );
}

export default CreateClothing;
