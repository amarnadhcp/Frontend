import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/common/NavBar"
import Footer from "../../components/common/Footer";

function Layout(){
    return(
        <>
          <NavBar/>
          <Outlet />
          <Footer/>
        </>  
    )
}

export default Layout