import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


const Login = ({ setUser }) => {
    const [users, setUsers] = useState([]);
    const [username, setUserName] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/users')
            const data = await res.json();
            setUsers(data);
        }
        fetchUsers();
    }, [])

    const handleSubmit = async e => {
        e.preventDefault();
        const user = loginUser({
          username,
        });
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    }

   function loginUser(user) {
        let foundUser = users.find(e => e.username === user.username);
        if(foundUser){
            return foundUser
        } else {
            alert("Invalid username.");
            setUserName('');
        }
        
    }

    return (
        <div id="loginBody">
            <div className="wrapper">
                <h3>Welcome to MyHub!</h3>
                <p>Please enter your username to continue:</p>
                <form onSubmit={handleSubmit}>
                    <label>
                        <input id="txtUsername" className="form-control" type="text" placeholder="Username" onChange={e => setUserName(e.target.value)}/>
                    </label>
                    <div>
                        <button type="submit" className="btn btn-light" id="btnLogin">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

Login.propTypes = {
    setUser: PropTypes.func.isRequired
}

export default Login
