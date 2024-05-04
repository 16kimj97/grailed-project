import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import grailedGif from '../../images/grailed.gif';

function Navigation({ isLoggedIn }) {
    return (
        <nav className="navigation">
            <div className="nav-container">
                {/* Always visible Home link */}
                <ul className="nav-list">
                    <li className="nav-item">
                        <NavLink to="/">
                            <img className='homeImg' src={grailedGif} alt='Home image' />
                        </NavLink>
                    </li>

                    {isLoggedIn && (
                        <>
                            <li className="nav-item">
                                <NavLink to="/user/current/clothing">My Clothing</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/clothing/new">Sell</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/current/offers">Sent Offers</NavLink>
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
