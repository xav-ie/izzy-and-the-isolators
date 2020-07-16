import React, { Component } from 'react';

class CreateBoard extends Component {
    render() {
        return (
            <div className="App">
                <a href="/canvas"><button type="button" class="createNewBoard">Create a New Board.</button></a>
            </div>
        );
    }
}
export default CreateBoard;