import DirectoryItem from "../directory-item/directory-item.component";
import categories from "../../categories";

import "./directory.styles.scss"

const Directory = () => {
    return (
      <div className="categories-container">
  
        {categories.map(({ title, id, imageUrl }) => {
          return(
              <DirectoryItem key={id} title={title} imageUrl={imageUrl}/>
          )}
        )}
  
        
      </div>
    );
  }
  
  export default Directory;
  