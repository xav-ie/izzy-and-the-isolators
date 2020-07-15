import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./styles.css";


class Home extends Component {
    render() {
        return (
            <div className="App">
                <ul>
                    <li><a class="active" href="/">Home</a></li>
                    <li><a href="/myBoards">My Boards</a></li>
                    <li><a href="/joinedBoards">Joined Boards</a></li>
                    <li><a href="/profile">Profile</a></li>
                </ul>
            </div>
        );
    }
}
export default Home;