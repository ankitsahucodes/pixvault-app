import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Header({ user, setUser }) {

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      window.location.href = `${import.meta.env.VITE_SERVER_BASE_URL}/auth/google`;
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/logout`, {}, {
        withCredentials: true,
      });
      console.log("logout route hit");
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          PixVault
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarNav"
        >
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/albums">
                Albums
              </Link>
            </li>
            <li className="nav-item"> 
              <Link className="nav-link" to="/images">
                Images
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/favourites">
                Favourites
              </Link>
            </li>
          </ul>

          <div>
            {user && (
              <span className="me-3 fw-semibold">
                Welcome, {user.name.split(" ")[0]}!
              </span>
            )}
          </div>

          <div>
            {user ? (
              <button
                onClick={handleLogout}
                className="btn btn-danger rounded-pill"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="btn btn-outline-primary rounded-pill"
              >
                Login with Google
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
