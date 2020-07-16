import React from "react";
import { Link } from "react-router-dom";
import "./pages/styles.css";

const NavBar = () => {
    return (<ul className="nav">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/createBoard">Create Board</Link></li>
        <li><Link to="/joinBoard">Join Board</Link></li>
    </ul>)
    
}

export default NavBar;