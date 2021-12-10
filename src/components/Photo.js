const Photo = ({ photo }) => {
    return (
        <div className="col">
            <img className="w-100 h-100" src={photo.url} alt={photo.title}></img>
        </div>
    )
}

export default Photo
