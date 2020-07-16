import React, { Component } from 'react';

class JoinBoard extends Component {
    render() {
        return (
            <div className="App">
                <form action="/" class="joinBoard">
                    <label class="boardIDClass" for="boardID">Board ID: </label>
                    <input type="text" id="boardID" name="boardID"></input>
                    <input type="submit" value="Submit"></input>
                </form>
            </div>
        );
    }
}
export default JoinBoard;