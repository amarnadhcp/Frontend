import React, { lazy, Suspense, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import PuffLoader from "react-spinners/PuffLoader";
import userRequest from "../../utils/userRequest";
const EditProfile = lazy(() => import("./EditProfile"));

const SellersProfile = () => {
  const queryClient = useQueryClient();
  const inputRef = useRef(null);

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["profileDatass"],
    queryFn: () =>
      userRequest.get("freelancer/profiledata").then((res) => res.data),
  });

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const response = await userRequest.post(
        "freelancer/updateimage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      queryClient.setQueryData(["profileDatass"], response.data);
    } catch (error) {
      // Handle error
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center min-h-screen mt-56">
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
    return <h1>something went wrong</h1>;
  }

  return (
    <main className="profile-page">
      <section className="relative block h-500-px">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dvprhxg7x/image/upload/v1692803630/asset/profilebanner_mn8ole.jpg')",
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-50 bg-black"
          ></span>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style={{ transform: "translateZ(0px)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </section>
      <section className="relative py-16 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <div className="w-40 h-40 overflow-hidden rounded-full shadow-xl absolute -m-16 -ml-20 lg:-ml-16 cursor-pointer">
                      <img
                        alt="..."
                        src={data?.freelancer.img}
                        className="object-cover w-full h-full border-none"
                        onClick={() => inputRef.current.click()}
                      />
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      ref={inputRef}
                      className="hidden"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <Suspense fallback={<div>.....</div>}>
                      <EditProfile data={data} />
                    </Suspense>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600 ">
                        {" "}
                        <a href={data?.freelancer.linkedin} target="_blank">
                          {" "}
                          <AiFillLinkedin size={30} />{" "}
                        </a>{" "}
                      </span>
                      <span className="text-sm text-blueGray-400">
                        linkedin
                      </span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        <a href={data?.freelancer.github} target="_blank">
                          {" "}
                          <AiFillGithub size={30} />{" "}
                        </a>
                      </span>
                      <span className="text-sm text-blueGray-400">GitHub</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        5
                      </span>
                      <span className="text-sm text-blueGray-400">Gigs</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-5">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                  {data?.freelancer.username}
                </h3>
                <div className="container flex justify-center items-center">
                  <div className="mb-2 text-blueGray-600 mr-4">
                    <i className="fas fa-envelope mr-2 text-lg text-blueGray-400"></i>
                    {data?.freelancer.email}
                  </div>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                    {data?.freelancer.country}
                  </div>
                </div>
                <div className="flex justify-center flex-wrap gap-2 mt-4">
                  {data?.freelancer.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-amber-400 text-white px-3 py-1 rounded-full text-sm font-semibold"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-7 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      {data?.freelancer.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SellersProfile;
