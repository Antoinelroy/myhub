import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await res.json();
            setUsers(data);
        }
        fetchUsers();
    }, [])
    return (
        <div className='container'>
                <div className="row row-cols-2 row-cols-md-5 g-2">
                {users.map((user, index) => ( 
                        <div className='card users' key={index} role="button" onClick={() => navigate('/profile', {state : user})}>
                            <div className='card-body'>
                                <h3>Name: {user.name}</h3>
                                <div>Username: <b>{user.username}</b></div>
                                <div>Email: <b>{user.email}</b></div>
                                <div>Phone: <b>{user.phone}</b></div>
                                <div>Website: <b>{user.website}</b></div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
        
    )
}

export default Users
