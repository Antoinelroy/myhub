import { Routes, Route, NavLink as Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import Home from "./components/Home";
import Posts from "./components/Posts";
import Albums from "./components/Albums";
import Login from "./components/Login";
import Photos from "./components/Photos";
import Profile from "./components/Profile";
import Users from "./components/Users";


function App() {
  const [ user, setUser ] = useState();

  useEffect(() => {
      const loggedInUser = window.localStorage.getItem("user");
      if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
      }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload(false);
  };

  if(!user) {
      return <Login setUser={setUser} />
  }
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">MyHub</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav me-auto mb-2 mb-lg-0">
              <Link id="profileNavLink" className='nav-link' activeclassname="active" aria-current="page" to="/" end>Profile</Link>
              <Link id="postsNavLink" className='nav-link' activeclassname="active" to="/posts">Posts</Link>
              <Link id="albumsNavLink" className='nav-link' activeclassname="active" to="/albums">Albums</Link>
              <Link id="usersNavLink" className='nav-link' activeclassname="active" to="/users">Other Users</Link>
            </div> 
            <div className="navbar-nav ml-auto">
              <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
            </div> 
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home user={user}/>} />
        <Route path="/posts" element={<Posts user={user}/>} />
        <Route path="/albums" element={<Albums user={user}/>} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
