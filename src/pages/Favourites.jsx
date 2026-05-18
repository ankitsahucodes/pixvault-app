import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading.jsx";
import ErrorMsg from "../components/ErrorMsg.jsx";
import { useImageContext } from "../context/ImageContext.jsx";
import { Link } from "react-router-dom";

function Favourites() {

    const { loadFavorites, toggleFavorite, loading, error, favImages } = useImageContext()
 

  const navigate = useNavigate();
  // console.log(favImages)

  useEffect(() => {
    loadFavorites();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMsg error={error} />;
  }

  return (
    <div className="container mt-4">
      {/* Heading */}
      <div className="d-flex align-items-center mb-4">

        <h2 className="fw-bold mb-0">Favourite Images </h2>
        <FaHeart className="text-danger ms-2 mt-1" size={25} />

      </div>

      {/* Empty State */}
      {favImages.length === 0 ? (
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: "50vh" }}
        >
          <FaHeart className="text-danger mb-3" size={78} />

          <h3>No favourites yet</h3>

          <p>Add photos to your favourites to see them here</p>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/albums")}
          >
            Go to Albums
          </button>
        </div>
      ) : (
        <div className="row">
          {favImages.map((image) => (
            <div key={image._id} className="col-md-4 mb-4">
              <div className="card shadow-sm border-0 h-100 image-card position-relative">
                <div>
                  {/* Heart */}
                  <button
                    className="btn position-absolute top-0 end-0 m-2 bg-white rounded-circle shadow-sm z-1"
                    onClick={() => toggleFavorite(image._id)}
                  >
                    {image.isFavorite ? (
                      <FaHeart className="text-danger" />
                    ) : (
                      <FaRegHeart className="text-danger" />
                    )}
                  </button>

                  {/* Image */}
                  <Link to={`/images/${image._id}`}>
                  <img
                    src={image.url}
                    alt={image.name}
                    className="card-img-top image-preview"
                    style={{
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                  </Link>
                </div>

                {/* Body */}
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="fw-bold mb-0">{image.name}</h6>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favourites;
