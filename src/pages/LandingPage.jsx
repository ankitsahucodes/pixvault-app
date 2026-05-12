
import { Link } from 'react-router-dom'
import {FaGithub} from 'react-icons/fa'

function LandingPage() {
  return (
    <div className='bg-light'>
     <main className="d-flex align-items-center justify-content-center container" style={{ minHeight: "90vh" }}>
      <section className="text-center">
        <h1 className="mt-5 mb-4 fw-bold display-4">
          Welcome to <span className="text-primary">PixVault</span>
        </h1>
        <p className="text-muted lead fw-semibold">
          A simple and elegant place to store, view, and manage your favorite
          memories. Upload your photos, organize albums, and relive every moment
          — beautifully.
        </p>

        <div className="mt-5">
          <Link
            to="/albums"
            className="btn btn-primary px-4 ms-3"
          >
            View Albums
          </Link>

          <Link
            to="/images"
            className="btn btn-warning px-4 ms-3"
          >
            View Images
          </Link>

          
        </div>
        <br />
        <div className="text-center py-5">
        Built with ❤️ by <a target="_blank" href="https://github.com/ankitsahucodes" className="fw-bold text-decoration-none">Ankit Sahu</a>
      </div>
      </section>

      
    </main>
    </div>
  )
}

export default LandingPage
