import React, { useRef, useState } from 'react';
import { AddPost } from '../../api/userApi';
import { useQuery } from "@tanstack/react-query";
import adminRequest from '../../utils/AdminRequest';
import { useNavigate } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader";
import Select from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();


const AddPostForm = () => {
  const navigate = useNavigate()
  const [currenterror, setError] = useState('');
  const titleRef = useRef(null);
  const categoryRef = useRef(null);
  const fileRef = useRef(null);
  const daysRef = useRef(null);
  const descriptionRef = useRef(null);
  const amountRef = useRef(null);
  const shortDescriptionRef = useRef(null); 
  const noOfCheckRef = useRef(null); 
  const [Features, setFeatures] = useState([]);


  const generateError = (field, message) => {
    setError(`${field} ${message}`);
    setTimeout(() => setError(''), 3000);
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ['categorys'],
    queryFn: () => adminRequest.get("/categorys")
      .then((res) => res.data)
  });

  if (isLoading) {
    return (
      <div className="flex justify-center  min-h-screen mt-44">
          <PuffLoader
            color={"#9c0ee8"}
            loading={isLoading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
      </div>
    );
  }
  if (error) {
    return <h1>something went wrong</h1>
  }

  const handleSelectChange = (selected) => {
    console.log(selected,894);
    const selectedFeatures = selected.map((option) => option.value);
    setFeatures(selectedFeatures);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!titleRef.current?.value.trim()) {
      generateError('Title', 'is required.');
    } else if (!categoryRef.current?.value.trim()) {
      generateError('category', 'is required.');
    } else if (!fileRef.current?.value.trim()) {
      generateError('image', 'is required.');
    } else if (!daysRef.current?.value.trim()) {
      generateError('days', 'is required.');
    } else if (!shortDescriptionRef.current?.value.trim()) {
      generateError('des', 'is required.');
    }else if (!noOfCheckRef.current?.value.trim()) {
      generateError('revision', 'is required.');
    }
     else if (!descriptionRef.current?.value.trim()) {
      generateError('des', 'is required.');
    } else if (descriptionRef.current?.value.trim().length < 15) {
      generateError('des', 'must be more');
    } else if (!amountRef.current?.value.trim()) {
      generateError('amount', 'is required.');
    } else if (!Features.length>0) {
      generateError('feautures', 'is required.');
    }
     else {
      const formData = new FormData();
      formData.append('title', titleRef.current.value);
      formData.append('cat', categoryRef.current.value);
      formData.append('deliveryTime', parseInt(daysRef.current.value));
      formData.append('shortDesc', shortDescriptionRef.current.value);
      formData.append('desc', descriptionRef.current.value);
      formData.append('revisionNumber', noOfCheckRef.current.value);
      formData.append('price', parseInt(amountRef.current.value));
      formData.append('features', Features);
      const files = fileRef.current.files;
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }


    
      AddPost(formData).then((res) => {
        if (res.data.created) {
          navigate("/")
        }
      })

    }


  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 mb-48">
      <div className="w-full max-w-3xl mx-auto bg-white p-5 rounded-md shadow-sm mb-52 ">
        <div className="text-center mb-5">
          <h1 className="font-bold text-3xl">New Post</h1>
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                ref={titleRef}
                className="p-2 border border-gray-200 rounded-md w-full"
                type="text"
                placeholder="Title"
              />
              <select ref={categoryRef} className="flex-1 p-2 border border-gray-200 rounded-md">
                <option value="" disabled selected>
                  Category
                </option>
                {data.map((category) => (
                  <option key={category._id} value={category.title}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                ref={fileRef}
                className="p-2 border border-gray-200 rounded-md w-full relative overflow-hidden"
                type="file"
                accept=".jpeg, .jpg, .png, .gif"
                multiple
              />
              <label className="bg-blue-500 text-white px-4 py-2 rounded-md absolute top-0 left-0 cursor-pointer">
                Choose images
              </label>

              <input
                ref={daysRef}
                className="p-2 border border-gray-200 rounded-md w-full"
                type="number"
                placeholder="Expected Days*"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                ref={shortDescriptionRef}
                className="p-2 border border-gray-200 rounded-md w-full"
                type="text"
                placeholder="Short Description"
              />
              <input
                ref={noOfCheckRef}
                className="p-2 border border-gray-200 rounded-md w-full"
                type="number"
                placeholder="Revision NO"
              />
            </div>

            <textarea
              ref={descriptionRef}
              className="p-2 border border-gray-200 rounded-md w-full"
              placeholder="Description*"
            ></textarea>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                ref={amountRef}
                className="p-2 border border-gray-200 rounded-md w-full"
                type="number"
                placeholder="Expected Amount*"
              />
              
              <Select
                        id='places'
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        isCreatable={true}
                        isLoading={false}
                        label="Add Feautures"
                        onChange={handleSelectChange}
                      />
            </div>
          </div>

          <div className="flex justify-center">
            {currenterror && (
              <span className="text-red-500 text-lg text-center">
                {currenterror}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="mt-4 w-full p-2 bg-green-600 text-white font-semibold text-sm rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPostForm;
