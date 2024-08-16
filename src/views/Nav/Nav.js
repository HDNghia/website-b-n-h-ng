import React from "react";
import './Nav.scss';
import {
    Link, NavLink
} from "react-router-dom";
class Nav extends React.Component {
    render() {
        //e.preventDefault()
        return (
            <div>
                <div className="topnav">
                    <NavLink to="/" activeClassName="active" exact={true}>
                        Register
                    </NavLink>
                    <NavLink to="/login" activeClassName="active">
                        Login
                    </NavLink>
                    <NavLink to="/profile" activeClassName="active">
                        Profile
                    </NavLink>
                    {/* <NavLink to="/about" activeClassName="active">
                        About
                    </NavLink>
                    <NavLink to="/user" activeClassName="active">
                        User
                    </NavLink> */}

                </div>
            </div>
        )
    }
}
export default Nav;