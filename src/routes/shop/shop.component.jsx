import "./shop.styles.scss"
import { Routes, Route } from "react-router-dom"
import CategoriesPreview from "../categories-preview/categories-preview.component"
import Category from "../category/category.component"

const Shop = () => {
    return(
        <Routes>
            {/* the first Route is all categories in shop page */}
            <Route index element={<CategoriesPreview />}></Route>
            <Route path=":category" element={<Category />}></Route>
        </Routes>
    )
}

export default Shop;