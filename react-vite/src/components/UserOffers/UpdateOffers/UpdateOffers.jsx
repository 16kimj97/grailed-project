import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './UpdateOffers.css'


const UpdateOffers = () => {
    const { offerId } = useParams();
    const parsedId = parseInt(offerId)
    const dispatch = useDispatch();

}
