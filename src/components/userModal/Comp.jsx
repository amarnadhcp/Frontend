import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSeller } from "../../Redux/UserSlice";
import { BecomeSeller } from "../../api/userApi";

export default function CollapseDefault() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const { id } = useSelector((state) => state.user);
  const [details, setDetails] = useState({
    id: id,
    country: "",
    description: "",
  });

  const toggleOpen = () => setOpen((cur) => !cur);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { country, description } = details;
    if (country.trim() === "") {
      setError("country is empty");
    } else if (description.trim() === "") {
      setError("description is empty");
    } else if (description.length < 10) {
      setError("description must be more than 10 characters");
    } else {
      const res = await BecomeSeller(details);
      if (res.data.updated) {
        dispatch(
          setSeller({
            isSeller: res.data.user.isSeller,
            country: res.data.user.country,
            desc: res.data.user.desc,
          })
        );
      }
    }
  };

  return (
    <>
      <button
        className="bg-red-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
        onClick={toggleOpen}
      >
        become a Freelancer
      </button>
      <div
        className={`${
          open ? "block" : "hidden"
        } my-4 mx-auto w-80 bg-white rounded-lg p-8`}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
              placeholder="Country"
              name="country"
              value={details.country}
              onChange={(e) =>
                setDetails({ ...details, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <textarea
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
              rows="3"
              placeholder="Description"
              name="description"
              value={details.description}
              onChange={(e) =>
                setDetails({ ...details, [e.target.name]: e.target.value })
              }
            />
          </div>
          {error && (
            <span className="text-red-500 text-lg text-center">{error}</span>
          )}
          <button
            className="mt-6 bg-green-500 active:bg-pink-600 text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none w-full"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
