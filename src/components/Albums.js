import { useState, useEffect } from 'react'
import Album from './Album'

const Albums = ({ user }) => {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchAlbums = async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/albums?userId=' + user.id);
            const data = await res.json();
            setAlbums(data);
        }
        fetchAlbums();
        
    }, [user])

    

    return (
        <div>
            <div className="body">
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    {albums.map((album, index) => (
                        <Album key={index} album={album}/>
                    ))}
                </div>
            </div>
        </div>
        
    )
}

export default Albums
