import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CreateAlbum = ({
  showCreateModal,
  setShowCreateModal,
  onCreated,
  editAlbum,
  isEdit,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setShowCreateModal(false);

    setName("");
    setDescription("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      setLoading(true);

      if (isEdit) {
        // UPDATE
        await axios.put(
          `${import.meta.env.VITE_SERVER_BASE_URL}/albums/${editAlbum._id}`,
          {
            name,
            description,
          },
          {
            withCredentials: true,
          },
        );

        toast.success("Album updated successfully");
      } else {
        // CREATE
        await axios.post(
          `${import.meta.env.VITE_SERVER_BASE_URL}/albums`,
          {
            name,
            description,
          },
          {
            withCredentials: true,
          },
        );

        toast.success("Album created successfully");
      }

      setName("");
      setDescription("");

      handleClose();

      onCreated && onCreated();
    } catch (err) {
      console.error(err);

      toast.error(isEdit ? "Failed to update album" : "Failed to create album");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEdit && editAlbum) {
      setName(editAlbum.name);
      setDescription(editAlbum.description || "");
    }
  }, [editAlbum, isEdit]);

  return (
    <>
      {/* Modal */}
      <div
        className={`modal fade ${showCreateModal ? "show d-block" : ""}`}
        tabIndex="-1"
      >
        <div className="modal-dialog ">
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <h5 className="modal-title">
                {isEdit ? "Edit Album" : "Create Album"}
              </h5>
              <button className="btn-close" onClick={handleClose}></button>
            </div>

            {/* Body */}
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <label htmlFor="albumName">Album Name:</label>
                <input
                  type="text"
                  className="form-control mt-2 mb-3"
                  id="albumName"
                  placeholder="eg. Summer Vacation 2026"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <label htmlFor="albumDescription">
                  Description (optional):
                </label>
                <textarea
                  className="form-control mt-2 mb-3"
                  id="albumDescription"
                  placeholder="Photos from our summer trip"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                {/* Footer */}
                <div className="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading
                      ? isEdit
                        ? "Updating..."
                        : "Creating..."
                      : isEdit
                        ? "Update"
                        : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {showCreateModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default CreateAlbum;
