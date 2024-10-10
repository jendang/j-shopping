import { Routes, Route } from 'react-router-dom'
import Navigation from "./routes/navigation/Navigation.component.jsx"
import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authentication.component.jsx"
import Contact from './routes/contact/contact.component';
import Shop from './routes/shop/shop.component.jsx';
import Checkout from './routes/check-out/checkout.component.jsx';


const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />}/>
        <Route path='shop' element={<Shop />}/>
        <Route path='auth' element={<Authentication />}/>
        <Route path='contact' element={<Contact />}/>
        <Route path='checkout' element={<Checkout />}/>
      </Route>
    </Routes>
  );
}

export default App;
