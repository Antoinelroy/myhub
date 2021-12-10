import { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";
import Post from './Post'
import Album from './Album'

const Profile = ({ user }) => {
    const [posts, setPosts] = useState([]);
    const [albums, setAlbums] = useState([]);

    const location = useLocation();
    let isUserLoggedIn;
    if(location.state !== null){
        isUserLoggedIn = false;
    } else{
        isUserLoggedIn = true;
    }

    useEffect(() => {
        const fetchPosts = async () => {
            let res;
            if(location.state !== null){
                res = await fetch('https://jsonplaceholder.typicode.com/posts?userId=' + location.state.id);
            } else {
                res = await fetch('https://jsonplaceholder.typicode.com/posts?userId=' + user.id);
            }
            
            const data = await res.json();
            setPosts(data);
        }
        fetchPosts();
        
    }, [user, location.state])

    useEffect(() => {
        const fetchAlbums = async () => {
            let res;
            if(location.state !== null){
                res = await fetch('https://jsonplaceholder.typicode.com/albums?userId=' + location.state.id);
            } else {
                res = await fetch('https://jsonplaceholder.typicode.com/albums?userId=' + user.id);
            }
            const data = await res.json();
            setAlbums(data);
        }
        fetchAlbums();
    }, [user, location.state])

    const firstThreePosts = posts.slice(0, 3);
    const firstThreeAlbums = albums.slice(0, 3);

    let welcomeMessage;
    if(location.state === null){
        welcomeMessage = <h2 className="welcome">Welcome to your profile {user.name}</h2>
    } else {
        welcomeMessage = <h2 className='welcome'>You are visiting the profile of {location.state.name}</h2>
    }

    return (
        <div className="container profile">
            {welcomeMessage}
            <div className="recentPosts">
                <p id="recentPosts">Recent posts</p>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {firstThreePosts.map((post, index) => (
                        <Post key={index} post={post} {...(isUserLoggedIn ? {user: user} : {user: location.state})}/>
                    ))}
                </div>
                <Link to="/posts" className="btn btn-secondary float-end" id="btnSeeMorePosts">See More...</Link>
                
            </div>
            <div className="recentAlbums">
                <p id="recentAlbums">Recent Albums</p>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {firstThreeAlbums.map((album, index) => (
                        <Album key={index} album={album}/>
                    ))}
                </div>
                <Link to="/albums" className="btn btn-secondary float-end" id="btnSeeMoreAlbums">See more...</Link>
            </div>
        </div>
    )
}

export default Profile
