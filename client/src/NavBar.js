import React from "react";
import { NavLink } from "react-router-dom";
import "./pages/styles.css";

const NavBar = () => {
    return (<ul className="nav">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/createBoard">Create Board</NavLink></li>
        <li><NavLink to="/joinBoard">Join Board</NavLink></li>
    </ul>)

}

export default NavBar;