import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
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

    <div className="collapse navbar-collapse justify-content-between" id="navbarNav">

      <ul className="navbar-nav mx-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/albums">Albums</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/images">Images</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/favouites">Favourites</Link>
        </li>
      </ul>

      <div>
        <button className="btn btn-outline-primary rounded-pill px-4">
          Login with Google
        </button>
      </div>

    </div>
  </div>
</nav>
  )
}

export default Header
