import "./directory-item.styles.scss"
import { Link } from "react-router-dom"

const DirectoryItem = ({ title, imageUrl }) => {
    return(
        <Link className="directory-container" to={`shop/${title}`}>
            <div 
            className="background-image" 
            style={{ 
            backgroundImage: `url(${imageUrl})`,
            }}></div>
            <div className="directory-body-container">
                <h2>
                   {title}
                </h2>
                <p>Shop now</p>
            </div>
        </Link>
    )
}

export default DirectoryItem;