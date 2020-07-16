import React from "react";
import "./pages/styles.css";

const Footer = () => {
    return (<footer>
        <p>&copy; {new Date().getFullYear()} Izzy and the Isolators</p>
        <p>Authors: Ennis Jackson, Izabel Ruiz, Xavier Ruiz, Tom Buckley, Jacob Walker, Andrew Elliot</p>
    </footer>);
}

export default Footer;