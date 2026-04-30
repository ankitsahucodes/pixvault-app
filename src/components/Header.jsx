import React from 'react'

function Header() {
  return (
  <nav className="navbar navbar-expand-lg bg-white border-bottom">
  <div className="container-fluid d-flex justify-content-between align-items-center">
    <a className="navbar-brand fw-bold text-primary" href="#">
      PixVault
    </a>

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
          <a className="nav-link" href="#">Albums</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Images</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Favourites</a>
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
