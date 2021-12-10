import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';



const Album = ({ album }) => {
    const [thumbnails, setThumbnails] = useState([]);

    useEffect(() => {
        const fetchThumbnails = async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/photos?albumId=' + album.id);
            const data = await res.json();
            setThumbnails(data);
        }
        fetchThumbnails();
    }, [album])

    const navigate = useNavigate();

    const firstFourThumbnails = thumbnails.slice(0, 4);

    return (
        <div className="col">
            <div className="card album" role="button" onClick={() => navigate('/photos', {state : album})}>
                <div className="card-body " >
                    <h3>Album title: {album.title}</h3>
                    
                    <div className="row row-cols-1 row-cols-md-2 g-1">
                            {firstFourThumbnails.map((thumbnail, index) => (
                                <img className="thumbnails" src={thumbnail.thumbnailUrl} alt={thumbnail.title} key={index}/>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Album
