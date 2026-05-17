import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="bg-light">
      <main
        className="d-flex align-items-center justify-content-center container"
        style={{ minHeight: "80vh" }}
      >
        <section className="text-center">
          <h1 className="mt-5 mb-4 fw-bold display-4">
            Welcome to <span className="text-primary">PixVault</span>
          </h1>
          <p className="text-muted lead fw-semibold">
            A simple and elegant place to store, view, and manage your favorite
            memories. Upload your photos, organize albums, and relive every
            moment — beautifully.
          </p>

          <div className="mt-5">
            <Link to="/albums" className="btn btn-primary px-4 ms-3">
              View Albums
            </Link>

            <Link to="/images" className="btn btn-warning px-4 ms-3">
              View Images
            </Link>
          </div>
          <br />
        </section>
      </main>
      <footer className="text-center py-4">
        Built with ❤️ by{" "}
        <a
          target="_blank"
          href="https://github.com/ankitsahucodes"
          className="fw-bold text-decoration-none"
        >
          Ankit
        </a>
      </footer>
    </div>
  );
}

export default LandingPage;
