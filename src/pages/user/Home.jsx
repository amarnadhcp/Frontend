import React from "react";
import Featured from "../../components/common/Featured";
// import Slide from "../../components/slide/Slide";
// import TrustedBy from "../../components/trustedBy/TrustedBy";
// import { cards } from "../../data"
// import CatCard from "../../components/catCard/CatCard"
import Cards from "../../components/user/Cards";
import NavBar from "../../components/user/NavBar"
import Footer from "../../components/user/Footer";
import Container from "../../components/user/Container";
import Working from "../../components/common/Working";
const Home = () => {
    return (
   
        <div className="home">
            <NavBar/>

            <Featured />

            <Cards />

            <Container/>    

            <Working/>

            <Footer/>
        </div>
    )
}

export default Home