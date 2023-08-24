import React from "react";

const Working = () => {
  return (
    <>
      <div className="flex h-auto justify-center items-center bg-violet-900 mt-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl p-4 md:p-8">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 relative">
            <div
              className="h-48 md:h-64 bg-cover bg-center rounded-t-lg"
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/dvprhxg7x/image/upload/v1692860186/asset/pexels-eren-li-7241413_ybqma0.jpg')",
                backgroundSize: "cover",
              }}
            ></div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                Find The Freelancer
              </h2>
              <p className="text-gray-600">
                Experienced in web development and design.
              </p>
            </div>
          </div>

          {/* Card 2 */}

          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 relative">
            <div
              className="h-48 md:h-64 bg-cover bg-center rounded-t-lg"
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/dvprhxg7x/image/upload/v1692860186/asset/pexels-fauxels-3182792_jgwboy.jpg')",
                backgroundSize: "cover",
              }}
            ></div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                Find The Freelancer
              </h2>
              <p className="text-gray-600">
                Experienced in web development and design.
              </p>
            </div>
          </div>

          {/* Card 3 */}

          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 relative">
            <div
              className="h-48 md:h-64 bg-cover bg-center rounded-t-lg"
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/dvprhxg7x/image/upload/v1692860178/asset/pexels-pixabay-269767_rtr1ny.jpg')",
                backgroundSize: "cover",
              }}
            ></div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                Find The Freelancer
              </h2>
              <p className="text-gray-600">
                Experienced in web development and design.
              </p>
            </div>
          </div>
        </div>
        <div className="fixed bottom-16"></div>
      </div>

      <div className="bg-new-color h-auto md:h-96 flex flex-col justify-center items-center p-4 md:p-8 mt-1">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-6">
          "The only way to do great work is to love what you do."
        </h1>
        <p className="text-base md:text-lg text-gray-300">
          Connecting With GIgSpot
        </p>
      </div>
    </>
  );
};

export default Working;
