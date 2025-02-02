import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ currentUser, cartCount, wishlistCount, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/"> <i class="bi bi-shop"></i> Shopaholic</Link>
        <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/"> <i class="bi bi-house"></i> Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart"> <i class="bi bi-bag"></i> Cart <span className="badge bg-primary">{cartCount}</span>
              </Link>
            </li>
            {currentUser ? (
              <li className="nav-item">
                <button className="btn btn-danger" onClick={onLogout}>Logout</button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login"> <i class="bi bi-person"></i> Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
