import CategoryItem from "../category-item/category-item.compoenent";
import categories from "../../categories";
import "./directory.styles.scss"

const Directory = () => {
    return (
      <div className="categories-container">
  
        {categories.map(({ title, id, imageUrl }) => {
          return(
              <CategoryItem key={id} title={title} imageUrl={imageUrl}/>
          )}
        )}
  
        
      </div>
    );
  }
  
  export default Directory;
  