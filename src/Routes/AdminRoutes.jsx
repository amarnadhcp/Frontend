import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Admin/Login"
import Home from "../pages/Admin/Home";
import AdminProtected from "../protected/AdminProtected";
import AdminPublic from "../protected/AdminPublic";
import Layout from "../pages/Admin/Layout";
import UserTable from "../components/Admin/UserTable";
import CategoryTable from "../components/Admin/CategoryTable";
import Manegement from "../components/Admin/Manegement"
const AdminRoutes = ()=>{
    return(
    <Routes>

      <Route exact path="/login" element={  <AdminPublic> <Login/>   </AdminPublic>}/>
      <Route  path="/" element={ <Layout> </Layout> }>
        <Route index element={ <AdminProtected>  <Home/>   </AdminProtected>}/>
        <Route path="/users" element={ <AdminProtected> <UserTable/> </AdminProtected>} />
        <Route path="/categories" element={ <AdminProtected> <CategoryTable/> </AdminProtected>} />
        <Route path="/payments" element={ <AdminProtected> <Manegement/> </AdminProtected>} />
      </Route>

    </Routes>
    )
}


export default AdminRoutes