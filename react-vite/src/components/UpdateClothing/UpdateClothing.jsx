import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchClothing, thunkFetchClothingById, thunkUpdateClothing } from '../../redux/clothing';

const UpdateSong = () => {
    const {clothingId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const parsedId = parseInt(clothingId)
    const clothing = useSelector(state => state.clothing[parsedId])
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

    useEffect(() =>{
        if (parsedId) {
            dispatch(thunkFetchClothingById(parsedId))
        }
    }, [dispatch, parsedId])
}
