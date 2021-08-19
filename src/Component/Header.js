import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="container">
        <nav>
          <ul>
            <li>
              <NavLink exact to="/" activeClassName="active">
                View Members
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/add-member" activeClassName="active">
                Add Member
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
