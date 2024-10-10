import { Outlet, Link  } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as JLogo } from "../../assets/crown.svg"
import "./Navigation.styles.scss"
import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

const Navigation = () => {
  //access currentUser who just signedIn or signedUp
  const { currentUser } = useContext(UserContext);
  console.log(currentUser)

    return(
      <Fragment>
        <div className="navigation">
        <Link className="logo" to="/">
          <JLogo className="logo"/>
        </Link>
          <div className="nav-links-container">
            <Link  className="nav-link" to="/shop">SHOP</Link>
            <Link  className="nav-link" to="/contact">CONTACT US</Link>
            {
              currentUser 
              ? 
              <div>
                <span>{currentUser.displayName}</span> 
                <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
              </div>
              
              :  <Link  className="nav-link" to="/auth">SIGN IN</Link>
            }

            <CartIcon />
           
          </div>
          <CartDropdown />
        </div>
        <Outlet />
      </Fragment>
    )
  }

  export default Navigation;