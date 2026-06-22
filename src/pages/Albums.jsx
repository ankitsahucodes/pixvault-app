import { useState, useEffect } from "react";
import { FaFolder } from "react-icons/fa";
import { BsThreeDotsVertical, BsTrash } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import Loading from "../components/Loading.jsx";
import ErrorMsg from "../components/ErrorMsg.jsx";
import DeleteAlbumModal from "../components/DeleteAlbumModal.jsx";
import CreateAlbum from "../components/CreateAlbum.jsx";
import { Link } from "react-router-dom";

function Albums() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editAlbum, setEditAlbum] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const loadAlbums = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/albums`,
        {
          withCredentials: true,
        },
      );
      //   console.log("Albums loaded:", response.data);
      setAlbums(response.data);
    } catch (err) {
      console.error("Failed to load albums:", err);
      setError("Failed to load albums");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadAlbums();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMsg error={error} />;
  }

  const filteredAlbums = albums.filter((album) =>
    album.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <div className="container mt-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h1 className="fw-bold">Albums</h1>
          {albums.length > 0 && (
            <button
              className="btn btn-primary"
              onClick={() => {
                setIsEdit(false);
                setEditAlbum(null);
                setShowCreateModal(true);
              }}
            >
              + Create Album
            </button>
          )}
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <span className="text-muted">
          {albums.length} {albums.length === 1 ? "album" : "albums"}
        </span>

        {albums.length > 0 && (
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search albums..."
            style={{ maxWidth: "300px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}
      </div>

      <div className="container mt-4">
        <div className="row">
          {filteredAlbums.map((album) => (
            <div key={album._id} className="col-md-4 mb-4">
              <div className="album-card p-3 rounded-3 position-relative">
                {/* 3 dots menu */}
                <div className="dropdown position-absolute top-0 end-0 m-2">
                  <button
                    className="btn btn-sm border-0 shadow-none"
                    data-bs-toggle="dropdown"
                  >
                    <BsThreeDotsVertical className="dots" />
                  </button>

                  <ul className="dropdown-menu">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setEditAlbum(album);
                          setIsEdit(true);
                          setShowCreateModal(true);
                        }}
                      >
                        <FaEdit /> Edit
                      </button>
                    </li>

                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={() => {
                          setSelectedAlbum(album);
                          setShowDeleteModal(true);
                        }}
                      >
                        <BsTrash className="mb-1" /> Delete
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Icon */}
                <Link
                  className="text-decoration-none"
                  to={`/albums/${album._id}`}
                >
                  <div className="d-flex align-items-center mb-3">
                    <FaFolder size={28} className="text-primary me-2" />
                    <h5 className="mb-0 fw-bold text-black">{album.name}</h5>
                  </div>

                  {/* Description */}
                  <p className="text-muted mb-0">
                    {album.description || "No description"}
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        {albums?.length === 0 && (
          <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ minHeight: "50vh" }}
          >
            <FaFolder className="display-1 text-secondary" />
            <h3>No albums yet</h3>
            <p>Create your first album to start organizing photos</p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setIsEdit(false);
                setEditAlbum(null);
                setShowCreateModal(true);
              }}
            >
              + Create Album
            </button>
          </div>
        )}
      </div>

      {filteredAlbums.length === 0 && searchTerm && (
        <div className="text-center mt-5">
          <h5 className="text-muted">No albums found</h5>
          <p className="text-secondary">Try searching with a different name.</p>
        </div>
      )}
      <CreateAlbum
        showCreateModal={showCreateModal}
        setShowCreateModal={setShowCreateModal}
        onCreated={loadAlbums}
        editAlbum={editAlbum}
        isEdit={isEdit}
      />
      <DeleteAlbumModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        selectedAlbum={selectedAlbum}
        onDeleted={loadAlbums}
      />
    </div>
  );
}

export default Albums;
