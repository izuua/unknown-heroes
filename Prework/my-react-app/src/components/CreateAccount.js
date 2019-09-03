import React from "react";

function CreateAccount() {
    return (
        <div>
            <form>
                <h3><strong>Email:</strong></h3><br/>
                <input type="text" name="email" /><br/>
                <h3><strong>Username:</strong></h3><br/>
                <input type="text" name="username" />
                <h3><strong>Password:</strong></h3><br/>
                <input type="text" name="password" />
                <h3><strong>Re-Type Password:</strong></h3><br/>
                <input type="text" name="re-typepassword" />

                <button id="create">Create</button>
            </form>
        </div>

    );
}
                
export default CreateAccount;