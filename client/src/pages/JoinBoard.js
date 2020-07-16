import React, { Component } from 'react';

class JoinBoard extends Component {
    render() {
        return (
            <div className="joinBoardContainer">
                <form action="/" class="joinBoard">
                    <label class="boardIDClass" for="boardID">Board ID: </label>
                    <input type="text" id="boardID" name="boardID"></input>
                    <input type="submit" value="Join"></input>
                </form>
            </div>
        );
    }
}
export default JoinBoard;