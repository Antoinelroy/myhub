import Photo from './Photo'
import {useLocation} from 'react-router-dom';
import { useState, useEffect } from 'react'

const Photos = () => {
    const location = useLocation();

    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/photos?albumId=' + location.state.id);
            const data = await res.json();
            setPhotos(data);
        }
        fetchPhotos();
    }, [location.state])

    console.log(location.state);
    return (
        <div className="body">
            <h3 className='album-title'>Album title: {location.state.title}</h3>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {photos.map((photo, index) => ( 
                    <Photo key={index} photo={photo}/>
                ))}
            </div>
        </div>
    )
}

export default Photos
