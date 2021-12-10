import { useState, useEffect } from 'react'


const Post = ({ post, user }) => {
    const [comments, setComments] = useState([]);
    const [isReplying, setIsReplying] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [loggedUser, setLoggedUser ] = useState();

  useEffect(() => {
      const loggedInUser = window.localStorage.getItem("user");
      if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setLoggedUser(foundUser);
      }
  }, []);

    useEffect(() => {
        const fetchComments = async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/comments?postId=' + post.id);
            const data = await res.json();
            setComments(data);
        }
        fetchComments();
    }, [post])

    

    const handleReplyClick = () => {
        setIsReplying(!isReplying);
    }

    const handleSubmitComment = () => {
        fetch('https://jsonplaceholder.typicode.com/comments?postId=' + post.id, {
            method: 'POST',
            body: JSON.stringify({
                postId: post.id,
                body: newComment,
                userId: loggedUser.id,
                name: "",
                email: loggedUser.email,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            })
            .then((response) => response.json())
            .then((json) => setComments([...comments, json]));
        setIsReplying(!isReplying);
    }

    let replyDiv;
    if(isReplying){
        replyDiv = <div><input type="text" className='form-control' onChange={e => setNewComment(e.target.value)} /><button className='btn btn-secondary' onClick={handleSubmitComment}>Reply</button><button className='btn btn-secondary float-end' onClick={handleReplyClick}>Cancel</button></div>
    } else {
        replyDiv = <div><button id="replyBtn" className="btn btn-secondary float-end" onClick={handleReplyClick}>Reply</button></div>
    }
    

    return (
        <div className="col">
            <div className="card posts">
                <div className="card-body">
                    <h3>Title: {post.title}</h3>
                    <div>Author: <span><div className='author' >{user.name}</div></span></div>
                    <p>{post.body}</p>
                    <div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Comments: </li>
                            {comments.map((comment, index) => (
                                <li className="list-group-item" key={index}><span><div style={{color: "blue", display: 'inline'}}>{comment.email}</div></span>: {comment.body}</li>
                            ))}
                            <li className="list-group-item" id={"post" + post.id}><span>{replyDiv}</span></li>
                        </ul>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Post
