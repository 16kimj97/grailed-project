import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import gif from '../../../dist/grailed.gif'

function Navigation() {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <ul className="nav-list">
          <li className="nav-item">
          <NavLink to="/">
          <img className='homeImg'src={gif} alt='Home image'></img>
          </NavLink>
          </li>
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
