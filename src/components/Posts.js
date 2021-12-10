import { useState, useEffect } from 'react'
import Post from './Post'

const Posts = ({ user }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        console.log(user);
        const fetchPosts = async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts?userId=' + user.id);
            const data = await res.json();
            console.log(data);
            setPosts(data);
        }
        fetchPosts();
        
    }, [user])

    

    return (
        <div>
            <div className="body">
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {posts.map((post, index) => ( 
                    <Post key={index} post={post} user={user}/>
                ))}
            </div>
        </div>
        </div>
        
    )
}

export default Posts
