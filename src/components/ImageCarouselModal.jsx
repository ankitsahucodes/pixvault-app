function ImageCarouselModal({
  images,
  selectedIndex,
  showCarousel,
  setShowCarousel,
}) {

  if (!showCarousel) return null;

  return (
    <>
      <div className="modal fade show d-block">
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content bg-dark">

            <div className="modal-header border-0">

              <button
                className="btn-close btn-close-white"
                onClick={() =>
                  setShowCarousel(false)
                }
              ></button>

            </div>

            <div className="modal-body d-flex align-items-center">

              <div
                id="imageCarousel"
                className="carousel slide w-100"
              >

                <div className="carousel-inner">

                  {images.map((img, i) => (

                    <div
                      key={img._id}
                      className={`carousel-item ${
                        i === selectedIndex
                          ? "active"
                          : ""
                      }`}
                    >

                      <img
  src={img.url}
  className="d-block mx-auto w-100"
  style={{
    maxHeight: "80vh",
    objectFit: "contain",
  }}
/>

                    </div>
                  ))}

                </div>

                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#imageCarousel"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon"></span>
                </button>

                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#imageCarousel"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon"></span>
                </button>

              </div>

            </div>

          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
}

export default ImageCarouselModal;