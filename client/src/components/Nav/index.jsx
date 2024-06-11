import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import Cart from '../Cart';
import './nav.css';

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="d-flex flex-column align-items-center">
          <li className="mx-1">
            <Link to="/home">HOME</Link>
          </li>
          <li className="mx-1">
            <Link to="/browse">BROWSE</Link>
          </li>
          <li className="mx-1">
            <Link to="/contact">CONTACT</Link>
          </li>
          <li className="mx-1">
            <Link to="/orderHistory">ORDER HISTORY</Link>
          </li>
          <li className="mx-1">
            <Link to="/upload">FILE UPLOAD</Link>
          </li>
          <li className="mx-1">
            <a href="/" onClick={() => Auth.logout()}>
              LOGOUT
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="d-flex flex-column align-items-center">
          <li className="mx-1">
            <Link to="/home">HOME</Link>
          </li>
          <li className="mx-1">
            <Link to="/browse">BROWSE</Link>
          </li>
          <li className="mx-1">
            <Link to="/contact">CONTACT</Link>
          </li>
          <li className="mx-1">
            <Link to="/signup">SIGNUP</Link>
          </li>
          <li className="mx-1">
            <Link to="/login">LOGIN</Link>
          </li>
          <li className="mx-1">
            <Link to="/Upload">FILE UPLOAD</Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="">
      <Cart />
      <h1>
        <Link to="/">
          <img className="mt-5" src="./pandapop-logo.png" alt="logo" />
        </Link>
      </h1>
      <nav>{showNavigation()}</nav>
    </header>
  );
}

export default Nav;
