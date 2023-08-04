import React from "react";
import Navbar from "../../components/user/NavBar";
import Footer from "../../components/user/Footer";
const Feed = () => {

    const gigData = [
        {
            id: 1,
            image: 'https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=1600',
            userImage: 'https://lh3.googleusercontent.com/a/AAcHTtd2rf7dV81XhbMhLJzn3pV8Mm27_Mx7kjKT-MalBkZHL7w=s96-c',
            userName: 'Amar',
            title:"Title",
            description: 'Sample gig description 1',
            totalStars: 100,
            starNumber: 20,
            price: 100,
        },
        {
            id: 2,
            image: 'https://images.pexels.com/photos/4458554/pexels-photo-4458554.jpeg?auto=compress&cs=tinysrgb&w=1600',
            userImage: 'https://lh3.googleusercontent.com/a/AAcHTtd2rf7dV81XhbMhLJzn3pV8Mm27_Mx7kjKT-MalBkZHL7w=s96-c',
            userName: 'John',
            title:"Title",
            description: 'Sample gig description 2',
            totalStars: 150,
            starNumber: 30,
            price: 85,
        },
        {
            id: 3,
            image: 'https://images.pexels.com/photos/6077368/pexels-photo-6077368.jpeg?auto=compress&cs=tinysrgb&w=1600',
            userImage: 'https://lh3.googleusercontent.com/a/AAcHTtd2rf7dV81XhbMhLJzn3pV8Mm27_Mx7kjKT-MalBkZHL7w=s96-c',
            userName: 'Emily',
            title:"Title",
            description: 'Sample gig description 3',
            totalStars: 200,
            starNumber: 40,
            price: 120,
        },
        {
            id: 4,
            image: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=1600',
            userImage: 'https://lh3.googleusercontent.com/a/AAcHTtd2rf7dV81XhbMhLJzn3pV8Mm27_Mx7kjKT-MalBkZHL7w=s96-c',
            userName: 'Michael',
            title:"Title",
            description: 'Sample gig description 4',
            totalStars: 80,
            starNumber: 16,
            price: 150,
        },
        
        // Add more entries here
    ];


    return (
        <>
        <Navbar />

        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 md:gap-16 px-4 sm:px-8 md:px-20">
      {gigData.map((item) => (
      <div key={item.id} className="border border-gray-300 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-4 sm:mb-8 md:mb-10 mt-8 sm:mt-16 rounded-md overflow-hidden">
      <img src={item.image} alt="" className="w-full h-1/2 object-cover rounded-t-md" />
      <div className="p-4 flex flex-col justify-between h-1/2">
        <div>
          <div className="flex items-center gap-2">
            <img src={item.userImage} alt="" className="w-7 h-7 rounded-full object-cover" />
            <span>{item.userName}</span>
          </div>
          <p className="text-gray-700 mt-2">{item.title}</p>
          <p className="text-gray-700">{item.description}</p>
        </div>
        <hr className="border-t-2 border-gray-300 " />

        <div className="flex justify-between items-center mt-3">
          <div className="flex flex-col">
            <span className="text-gray-500 text-xs">STARTING AT</span>
            <h2 className="text-gray-700 text-lg font-normal">${item.price}</h2>
          </div>
          <img src="/img/heart.png" alt="" className="w-4 h-4 cursor-pointer" />
        </div>
      </div>
    </div>
  ))}
</div>







    </>
       

    )
}

export default Feed



   {/* <div className="star flex items-center gap-2">
                                <img src="/img/star.png" alt="" className="h-4 w-4" />
                                <span>{!isNaN(item.totalStars / item.starNumber) && Math.round(item.totalStars / item.starNumber)}</span>
                            </div> */}