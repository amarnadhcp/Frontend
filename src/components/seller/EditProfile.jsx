import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import userRequest from "../../utils/userRequest";
import { useFormik } from "formik";
// import CreatableSelect from "react-select/creatable";
// import PuffLoader from "react-spinners/PuffLoader";

// import makeAnimated from "react-select/animated";
import { profileValidation } from "../../yup/validation";
// const animatedComponents = makeAnimated();

function EditProfile({data}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleImageClick = () => {
    document.getElementById("imageInput").click();
  };


  const mutation = useMutation({
    mutationFn:(data)=>{
      return userRequest.post("freelancer/editprofile",data)
    }
  })

  
  const initialValues = {
    username: "",
    country: "",
    language: "",
    phone: "",
    github: "",
    linkedin: "",
    skills: [],
    desc: "",
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
    setValues: setFormValues,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: profileValidation,
    onSubmit: async (values) => {
      if (!mutation.isLoading) {
        mutation.mutate(values);
      }
    },
  });

  useEffect(() => {
    if (data?.freelancer) {
      const updatedInitialValues = {
        username: data.freelancer.username || "",
        country: data.freelancer.country || "",
        language: data.freelancer.language || "",
        phone: data.freelancer.phone || "",
        github: data.freelancer.github || "",
        linkedin: data.freelancer.linkedin || "",
        skills: data.freelancer.skills || [],
        desc: data.freelancer.desc || "",
      };
      setFormValues(updatedInitialValues);
    }
  }, [data]);







  return (
    <div>
      <button
        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
        onClick={toggleModal}
      >
        Edit Profile
      </button>

      {modalVisible && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full md:max-w-2xl lg:max-w-3xl mx-4">
            <div className="p-6">
              <button
                type="button"
                className="absolute flex text-gray-400 hover:text-gray-700 rounded-full p-1 transition-all duration-150"
                onClick={toggleModal}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="flex justify-center mb-4">
                <label htmlFor="imageInput" className="cursor-pointer">
                  <img
                    src={
                      selectedImage
                        ? URL.createObjectURL(selectedImage)
                        : data.freelancer.img
                    }
                    alt="User Profile"
                    className="w-20 h-20 rounded-full border border-gray-300 cursor-pointer"
                    onClick={handleImageClick}
                  />
                </label>
                <input
                  type="file"
                  id="imageInput"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className={`${
                        touched.username && errors.username
                          ? "border-red-500"
                          : ""
                      } bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring focus:border-blue-500 w-full p-2.5`}
                      placeholder="Your username"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.username && errors.username && (
                      <div className="text-red-500 flex justify-center">
                        {errors.username}
                      </div>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      name="country"
                      id="country"
                      className={`${
                        touched.country && errors.country
                          ? "border-red-500 "
                          : ""
                      } bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring focus:border-blue-500 w-full p-2.5`}
                      placeholder="Country"
                      value={values.country}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.country && errors.country && (
                      <div className="text-red-500 flex justify-center">
                        {errors.country}
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="language"
                      id="language"
                      className={`${
                        touched.language && errors.language
                          ? "border-red-500"
                          : ""
                      } bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring focus:border-blue-500 w-full p-2.5 `}
                      placeholder="Preferred language"
                      value={values.language}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.language && errors.language && (
                      <div className="text-red-500 flex justify-center">
                        {errors.language}
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      className={`${
                        touched.phone && errors.phone ? "border-red-500" : ""
                      } bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring focus:border-blue-500 w-full p-2.5 `}
                      placeholder="Phone number"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.phone && errors.phone && (
                      <div className="text-red-500 flex justify-center">
                        {errors.phone}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    name="github"
                    id="github"
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring focus:border-blue-500 w-full p-2.5"
                    placeholder="Your GitHub profile link"
                    value={values.github}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.github && errors.github && (
                    <div className="text-red-500 flex justify-center">
                      {errors.github}
                    </div>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="linkedin"
                    id="linkedin"
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring focus:border-blue-500 w-full p-2.5"
                    placeholder="Your LinkedIn profile link"
                    value={values.linkedin}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.linkedin && errors.linkedin && (
                    <div className="text-red-500 flex justify-center">
                      {errors.linkedin}
                    </div>
                  )}
                </div>

                {/* <label
                  htmlFor="skills"
                  className="block text-sm font-medium text-gray-900 mb-1"
                >
                  Skills
                </label>
                <CreatableSelect
                  id="places"
                  isClearable
                  name="skills"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  isCreatable={true}
                  isLoading={false}
                  placeholder="Add Features"
                  defaultInputValue={values.skills}
                  onChange={handleChange}
                      onBlur={handleBlur}
                  // onChange={}
                /> */}

                <div>
                  <textarea
                    name="desc"
                    id="desc"
                    className={`${
                      touched.desc && errors.desc ? "border-red-500" : ""
                    } bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring focus:border-blue-500 w-full p-2.5 `}
                    placeholder="Tell us about yourself"
                    value={values.desc}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.desc && errors.desc && (
                    <div className="text-red-500 flex justify-center">
                      {errors.desc}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-white"
                >
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProfile;
