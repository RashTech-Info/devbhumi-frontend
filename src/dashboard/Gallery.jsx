"use client";

import { useState, useEffect } from "react";
import { PlusCircle, Edit, Trash, ImageIcon, Database, X } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const API_BASE = import.meta.env.VITE_API_BASE;

const ImageDashboard = () => {
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    files: [],
    previewUrls: [],
    location: "",
  });
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch images
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/getGallery`, {
        withCredentials: true,
      });
      setImages(
        res.data.map((item) => ({
          id: item._id,
          title: item.title,
          urls: (item.image || []).map(
            (img) => `${API_BASE}/gallery/${img}` // ✅ Corrected path
          ),
          location: item.location || "",
          createdAt: item.createdAt,
        }))
      );
    } catch (err) {
      console.error("Error fetching images:", err);
      setImages([]);
      toast.error("Failed to load images");
    }
    setLoading(false);
  };

  // Handle file change
  const handleFileChange = (e) => {
  const files = Array.from(e.target.files);
  const previews = files.map((file) => URL.createObjectURL(file));
  setFormData((prev) => ({
    ...prev,
    files,
    previewUrls: previews,
  }));
};

// Submit form (Add/Edit)
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.title || (!formData.files.length && !editId)) {
    toast.error("Please fill all required fields");
    return;
  }

  const data = new FormData();
  data.append("title", formData.title);
  data.append("location", formData.location);

  // Only append files if new files are selected
  if (formData.files.length > 0) {
    formData.files.forEach((file) => data.append("image", file));
  }

  try {
    if (editId) {
      await axios.put(`${API_BASE}/updateGallery/${editId}`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Image updated successfully!");
    } else {
      await axios.post(`${API_BASE}/addGallery`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Image added successfully!");
    }
    fetchImages();
    closeModal();
  } catch (err) {
    console.error(err);
    toast.error("Failed to save image");
  }
};

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ title: "", files: [], previewUrls: [], location: "" });
    setEditId(null);
  };

  // Edit image
  const handleEdit = (image) => {
    setFormData({
      title: image.title,
      files: [],
      previewUrls: image.urls,
      location: image.location,
    });
    setEditId(image.id);
    setIsModalOpen(true);
  };

  // Delete confirmation
  const confirmDelete = (id) => {
    setDeleteId(id);
  };

  // Delete image
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE}/deleteGallery/${deleteId}`, {
        withCredentials: true,
      });
      setImages(images.filter((img) => img.id !== deleteId));
      toast.success("Image deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete image");
    }
    setDeleteId(null);
  };

  return (
    <div className=" space-y-8">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center space-x-4">
          <Database className="text-blue-500" size={40} />
          <div>
            <p className="text-sm text-gray-500">Total Images</p>
            <p className="text-2xl font-bold">{images.length}</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center space-x-4">
          <ImageIcon className="text-green-500" size={40} />
          <div>
            <p className="text-sm text-gray-500">Recently Added</p>
            <p className="text-2xl font-bold">
              +{images.length >= 3 ? 3 : images.length}
            </p>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Image Gallery</h2>
        <button
          onClick={() => {
            setFormData({
              title: "",
              files: [],
              previewUrls: [],
              location: "",
            });
            setEditId(null);
            setIsModalOpen(true);
          }}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow cursor-pointer"
        >
          <PlusCircle size={20} />
          <span>Add Image</span>
        </button>
      </div>

      {/* Image List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            Loading...
          </div>
        ) : images.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No images found.
          </div>
        ) : (
          images.map((image) => (
            <div
              key={image.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden group relative hover:shadow-xl transition-shadow"
            >
              <img
                src={image.urls[0] || "/placeholder.svg"}
                crossOrigin="anonymous"
                alt={image.title}
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-lg truncate">{image.title}</h3>
              </div>
              <div className="absolute top-2 right-2 flex space-x-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition">
                <button
                  onClick={() => handleEdit(image)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full shadow cursor-pointer"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => confirmDelete(image.id)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow cursor-pointer"
                >
                  <Trash size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <X size={24} />
            </button>

            <h2 className="text-xl font-bold mb-4">
              {editId ? "Edit Image" : "Add New Image"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {editId
                    ? "Replace Image(s) (optional)"
                    : "Upload Image(s)"}
                </label>
                <div className="flex flex-col space-y-3">
                  {formData.previewUrls.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.previewUrls.map((src, i) => (
                        <img
                          key={i}
                          src={src || "/placeholder.svg"}
                          crossOrigin="anonymous"
                          alt="Preview"
                          className="w-20 h-20 object-cover rounded-lg border"
                        />
                      ))}
                    </div>
                  )}

                  <label className="flex flex-col w-full border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                      <svg
                        className="w-10 h-10 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-sm text-gray-500 text-center">
                        {formData.files.length > 0
                          ? formData.files.map((f) => f.name).join(", ")
                          : "Click to upload"}
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      required={!editId}
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                >
                  {editId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setDeleteId(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <X size={24} />
            </button>

            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6">
              Are you sure you want to delete this image? This action cannot be
              undone.
            </p>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageDashboard;
