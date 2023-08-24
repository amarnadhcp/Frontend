import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import userRequest from "../../utils/userRequest"
import { useSelector } from 'react-redux';

const Sent = ({sellerId}) => {
  const {id}=useSelector(state=>state.user)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formError, setError] = useState('')
  const [formData, setFormData] = useState({
    recuriment: '',
    timePeriod: '',
    price: ''
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const createError = (msg) => {
    setError(msg)
    setTimeout(() => setError(""), 3000)
  }

  const mutation =  useMutation({
    mutationFn:(newProposal)=>{
      return userRequest.post("users/newproposal",newProposal)
    }
  })

  const handleSumit = async (e) => {
    e.preventDefault();
    const { recuriment, timePeriod, price } = formData;
    if (recuriment.trim().length < 20) {
      createError("Requirement should be more than 20 characters");
    } else if (timePeriod === '') {
      createError("Time is required");
    } else if (timePeriod <= 0) {
      createError("Time must be a positive value");
    } else if (price === '') {
      createError("Price is required");
    } else if (price <= 0) {
      createError("Price must be a positive value");
    } else {
      mutation.mutate({recuriment,timePeriod,price,sellerId})
      closeModal();
    }


  };

  return (
    <>
      <button
        className="bg-amber-400 text-white font-semibold rounded px-3 py-1 mt-2 focus:outline-none"
        disabled={id===sellerId}
        onClick={openModal}
      >
        send Preposal
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-gray-700">
          <div className="bg-white border rounded p-6 max-w-2xl mx-auto w-4/5 h-auto">
            <h2 className="text-3xl font-semibold mb-6">Enter Recruitment Details</h2>
            <form onSubmit={handleSumit}>
              <div className="mb-4 md:mb-6">
                <label className="block text-sm font-semibold mb-2">Requirement:</label>
                <textarea
                  rows="4"
                  name="recuriment"
                  className="w-full border rounded px-3 py-2"
                  onChange={(e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }}
                />
              </div>
              <div className="flex flex-col md:flex-row md:space-x-4 mb-4 md:mb-6">
                <div className="w-full md:w-1/2">
                  <label className="block text-sm font-semibold mb-2">Price:</label>
                  <input
                    type="number"
                    name="price"
                    className="w-full rounded p-2 border border-gray-400 "
                    onChange={(e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }}
                  />
                </div>
                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                  <label className="block text-sm font-semibold mb-2">Time Period:</label>
                  <input
                    type="number"
                    name="timePeriod"
                    className="w-full rounded p-2 border border-gray-400"
                    onChange={(e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }}
                  />
                </div>
              </div>
              <div className="mb-6 flex items-center justify-center">
                <label className="text-red-500 text-lg text-center">{formError}</label>
              </div>
              <div className="flex flex-col md:flex-row justify-center md:justify-end">
                <button
                  type="button"
                  className="bg-but-color hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded mt-3 p"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-button-color focus:outline-none text-white font-semibold py-2 px-4 rounded mt-3"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Sent;
