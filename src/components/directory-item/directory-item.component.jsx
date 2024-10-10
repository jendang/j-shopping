import "./directory-item.styles.scss"

const DirectoryItem = ({ title, imageUrl }) => {
    return(
        <div className="directory-container">
            <div 
            className="background-image" 
            style={{ 
            backgroundImage: `url(${imageUrl})`,
            }}></div>
            <div className="directory-body-container">
                <h2>{title}</h2>
                <p>Shop now</p>
            </div>
        </div>
    )
}

export default DirectoryItem;