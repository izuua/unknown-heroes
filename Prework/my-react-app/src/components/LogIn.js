import React from "react";

function LogIn() {
    return (
        <div>
            <form>
                <h3><strong>Username:</strong></h3><br/>
                <input type="text" name="username" /><br/>
                <h3><strong>Password:</strong></h3><br/>
                <input type="text" name="lastname" />
                <button id="log-in">Log In</button>
            </form>
        </div>

    );
}
                
export default LogIn;