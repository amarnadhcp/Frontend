import React, { useState } from "react";
import Select from "react-select/creatable";
import makeAnimated from "react-select/animated";
import { setSeller } from "../../Redux/UserSlice";
import { useFormik } from "formik";
import { sellerFormValidation } from "../../yup/validation";
import { BecomeSeller } from "../../api/userApi";
import { useDispatch } from "react-redux";

const animatedComponents = makeAnimated();

export default function CollapseDefault() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const initialValues = {
    country: "",
    language: "",
    phone: "",
    skills: [],
    desc: "",
  };

  const toggleOpen = () => setOpen((cur) => !cur);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: sellerFormValidation,
    onSubmit: async (values) => {
      // Your submission logic here

      const res = await BecomeSeller(values);
      if (res.data.updated) {
        console.log(res.data.user.isSeller);
        dispatch(
          setSeller({
            isSeller: res.data.user.isSeller,
            country: res.data.user.country,
            desc: res.data.user.desc,
          })
        );
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <button
        className="bg-red-500 active:bg-pink-600 text-white font-semibold hover:shadow-md px-4 py-2 rounded-md outline-none focus:outline-none mb-4 transition-all duration-150"
        onClick={toggleOpen}
      >
        Become a Freelancer
      </button>
      <div
        className={`${open ? "block" : "hidden"
          } w-full max-w-md bg-white rounded-lg p-8 shadow-md`}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            className=" uppercase border rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 w-full text-sm"
            placeholder="Country"
            name="country"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.country}
          />
          {touched.country && errors.country && (
            <div className="text-red-500 text-sm ">{errors.country}</div>
          )}

          <input
            type="text"
            className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 w-full text-sm"
            placeholder="Language"
            name="language"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.language}
          />
          {touched.language && errors.language && (
            <div className="text-red-500 text-sm">{errors.language}</div>
          )}

          <input
            type="text"
            className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 w-full text-sm"
            placeholder="Phone"
            name="phone"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phone}
          />
          {touched.phone && errors.phone && (
            <div className="text-red-500 text-sm">{errors.phone}</div>
          )}

          <Select
            id="places"
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            isCreatable={true}
            isLoading={false}
            placeholder="Add skills"
            options={values.skills.map(skill => ({ label: skill, value: skill }))}
            onChange={(selectedOptions) =>
              setFieldValue("skills", selectedOptions.map(option => option.value))
            }
            value={values.skills.map(skill => ({ label: skill, value: skill }))}  
          />



          {touched.skills && errors.skills && (
            <div className="text-red-500 text-sm">{errors.skills}</div>
          )}

          <textarea
            className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 w-full text-sm"
            rows="3"
            placeholder="Description"
            name="desc"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.desc}
          />
          {touched.desc && errors.desc && (
            <div className="text-red-500 text-sm">{errors.desc}</div>
          )}

          <button
            className="bg-green-500 active:bg-pink-600 text-white font-semibold hover:shadow-md px-4 py-2 rounded-md outline-none focus:outline-none w-full transition-all duration-150"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
