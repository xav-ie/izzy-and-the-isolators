import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./styles.css";


class Home extends Component {
    render() {
        return (
            <div className="App">
                <ul class="nav">
                    <li><a href="/">Home</a></li>
                    <li><a href="/createBoard">Create Board</a></li>
                    <li><a href="/joinBoard">Join Board</a></li>
                </ul>
                <h3>Hello, and welcome.</h3>
                <br></br>
                <p>This website is aimed to provide users with a collaborative workspace allowing for the sharing of ideas on a digital whiteboard.</p>
                <br></br>
                <p>In order to create your own board room, navigate to <b>Create Board</b>. From here, select <b>Create a New Board</b>. This will then open up a new board room with a unique ID.</p>
                <br></br>
                <p>This unique ID will be displayed at the top of the webpage when in your new board. If you want to invite collaborators, simply tell them your board ID, have them navigate to <b>Join Board</b> and input your boards ID.</p>
            </div>
        );
    }
}
export default Home;