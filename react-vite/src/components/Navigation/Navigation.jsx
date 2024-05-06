
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import grailedGif from '../../images/grailed.gif';
import { useSelector } from 'react-redux';

function Navigation() {
    const currentUser = useSelector(state => state.session.user);

    return (
        <nav className="navigation">
            <div className="nav-container">
                <ul className="nav-list">
                    <li className="nav-item">
                        <NavLink to="/" exact activeClassName="active">
                            <img className='homeImg' src={grailedGif} alt='Home image' />
                        </NavLink>
                    </li>
                    {currentUser && (
                        <>
                            <li className="nav-item">
                                <NavLink to="/user/current/clothing" activeClassName="active">My Clothing</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/clothing/new" activeClassName="active">Sell</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/current/offers" activeClassName="active">Sent Offers</NavLink>
                            </li>
                        </>
                    )}
                </ul>

                <ul className="profile-container">
                    <li className="nav-item">
                        <ProfileButton />
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;
