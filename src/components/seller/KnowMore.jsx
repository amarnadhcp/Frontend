import React, { useState } from 'react';

const KnowMore = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleOverlayClick = (event) => {
    if (event.target.id === 'overlay') {
      closeModal();
    }
  };

  return (
    <>
      <button
        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 mt-7 ml-5"
        onClick={showModal}
      >
        Know More
      </button>
      {isModalOpen && (
        <div
          id="overlay"
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-10"
          onClick={handleOverlayClick}
        >
          <div className="bg-white p-3 sm:p-6 rounded-lg shadow-lg w-full sm:max-w-md md:max-w-lg">
            <button
              className="px-2 py-1 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 absolute top-2 right-2 focus:outline-none"
              onClick={closeModal}
            >
              ✕
            </button>
            <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-4">Hell!</h3>
            <p className="text-gray-700 text-xs sm:text-sm">
             {props.data}

            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default KnowMore;
