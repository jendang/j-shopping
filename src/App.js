import { Routes, Route } from 'react-router-dom'
import Navigation from './components/routes/navigation/Navigation.component';
import Home from "./components/routes/home/home.component";




const Shop = () => {
  return(
    <div>
      Im shop page
    </div>
  )
}



const App = () => {

  return (
    <Routes>
    <Route path='/' element={<Navigation />}>
      <Route index element={<Home />}/>
      <Route path='shop' element={<Shop />}/>
    </Route>
    </Routes>
  );
}

export default App;
