import React, { useState, useRef, useEffect } from 'react';
import { AddCategory } from '../../api/adminApi';

const AddCategoryModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [Error, setError] = useState("");
  const modalRef = useRef();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Close the modal when clicking outside of it
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showModal]);

  const handleSubmit = () => {
    if (title.trim() === "") {
      setError("Title is empty");
    } else if (description.trim() === "") {
      setError("Description is empty");
    } else if (image === null) {
      setError("Select an image");
    } else {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("title", title);
      formData.append("desc", description);

      AddCategory(formData)
        .then((res) => {
          console.log(res,"this is teh responnse");
           if(res.data.success===true){
            console.log("yes");
             closeModal();
           }else{
            setError("something went wrong");
            console.log("no");
           }
        })

      // closeModal();
    }
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={openModal}
      >
        Add Category
      </button>
      {showModal && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md" ref={modalRef}>
            <span
              className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 cursor-pointer"
              onClick={closeModal}
            >
              &times;
            </span>
            <h2 className="text-2xl flex justify-center not-italic mb-4">Add New Category</h2>
            <div className="mb-4">
              <label className="block font-bold mb-1">Title:</label>
              <input
                className=" w-full border rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-1">Description:</label>
              <input
                className="w-full border rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                type="text"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-1">Image:</label>
              <input
                className="w-full border rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-red-500 font-mono text-lg">
                {Error && Error}
              </span>
              <div className="space-x-2">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCategoryModal;
