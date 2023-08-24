import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/common/Home";
import Profile from "../pages/common/ProFile"
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import EmailVerify from "../components/Emailverify/EmailVerify";
import Dashboard from "../pages/common/DashBoard"
import Feed from "../pages/common/Feed";
import UserPublic from "../protected/UserPublic";
import UserProtect from "../protected/UserProtected";
import PageNotFound from "../pages/user/PageNotFound";
import SingleGig from "../components/common/SingleGig"
import CategorieWise from "../pages/common/Categoriewise";
import Layout from "../pages/common/Layout"
import Success from "../components/user/Success";
import Pay from "../pages/Payment/Pay"
import Chat from "../pages/common/Chat"
import Form from "../pages/common/Form"
import Paypreposal from "../pages/ProposalPay/Pay"


const UserRoutes = () => {
  return (
    <Routes>
      <Route  path="*" element={<PageNotFound/>}/>
      <Route exact path="/login" element={<UserPublic>      <Login />     </UserPublic>} />
      <Route exact path="/register" element={<UserPublic> <Register /> </UserPublic>} />
      <Route exact path="/:id/verify/:token" element={<EmailVerify />} />

      <Route  path="/" element={ <Layout> </Layout> }>
      <Route index element={<Home/>}/>
      <Route exact path="/profile" element={<UserProtect>  <Profile />  </UserProtect>} />
      <Route exact path="/dashboard" element={  <UserProtect>    <Dashboard/>  </UserProtect>  } />
      <Route exact path="/chat/:id" element={  <UserProtect> <Chat/>    </UserProtect>     } />
      <Route exact path="/chat" element={ <UserProtect> <Chat/> </UserProtect>       } />

      <Route exact path="/feed" element={<Feed/>}/>
      <Route exact path="/gig/:id" element={<SingleGig/>}/>
      <Route exact path="/pay/:id" element={<UserProtect>  <Pay/> </UserProtect>}/>
      <Route exact path="/pay-preposal/:id" element={<UserProtect> <Paypreposal/> </UserProtect>}/>
      <Route exact path="/success" element={<UserProtect> <Success/>  </UserProtect>}/>
      <Route exact path="/category/:id" element={<CategorieWise/>}/>
      <Route exact path="/form" element={<Form/>}/>
      </Route>
    </Routes>
  );
};





export default UserRoutes;
