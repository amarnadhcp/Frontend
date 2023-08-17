import React from "react";
import Profile from "../../components/user/Profile";
import SellersProfile from "../../components/seller/SellersProfile"
import { useSelector } from "react-redux";
const ProFile = () =>{
   const{isSeller}=useSelector(state=>state.user)
   return(
    <div>
     
      {isSeller ? <SellersProfile /> : <Profile />}
   </div>
   )
}



export default  ProFile