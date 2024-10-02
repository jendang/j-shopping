import { Outlet, Link  } from "react-router-dom";
import { Fragment } from "react";
import { ReactComponent as JLogo } from "../../../assets/crown.svg"
import "./Navigation.styles.scss"

const Navigation = () => {
    return(
      <Fragment>
        <div className="navigation">
        <Link className="logo" to="/">
          <JLogo className="logo"/>
        </Link>
          <div className="nav-links-container">
            <Link  className="nav-link" to="/">HOME</Link>
            <Link  className="nav-link" to="/shop">SHOP</Link>
            <Link  className="nav-link" to="/contact">CONTACT US</Link>
            
          </div>
        </div>
        <Outlet />
      </Fragment>
    )
  }

  export default Navigation;