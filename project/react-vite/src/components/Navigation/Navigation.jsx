import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/" activeClassName="active-link">Home</NavLink>
          </li>
          <li className="nav-item">
            <ProfileButton />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
