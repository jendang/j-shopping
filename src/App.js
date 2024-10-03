import { Routes, Route } from 'react-router-dom'
import Navigation from './components/routes/navigation/Navigation.component';
import Home from "./components/routes/home/home.component";
import SignIn from './components/routes/sign-in/sign-in.component';
import Contact from './components/routes/contact/contact.component';


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
      <Route path='sign-in' element={<SignIn />}/>
      <Route path='contact' element={<Contact />}/>
    </Route>
    </Routes>
  );
}

export default App;
