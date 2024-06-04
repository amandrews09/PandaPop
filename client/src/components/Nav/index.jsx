import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import './nav.css';

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/orderHistory">Order History</Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
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
        </ul>
      );
    }
  }

  return (
    <header className="">
      <h1>
        <Link to="/">
          <img className="w-75 ms-4 mt-5" src="../src/assets/pandapop-logo.png" alt="logo" />
        </Link>
      </h1>

      <nav>{showNavigation()}</nav>
    </header>
  );
}

export default Nav;
