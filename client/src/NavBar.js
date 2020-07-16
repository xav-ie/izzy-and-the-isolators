import React from "react";
import { Link } from "react-router-dom";
import "./pages/styles.css";

const NavBar = () => {
    return (<ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/myBoards">My Boards</Link></li>
        <li><Link to="/joinedBoards">Joined Boards</Link></li>
        <li><Link to="/profile">Profile</Link></li>
    </ul>);
}

export default NavBar;