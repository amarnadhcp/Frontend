import React from "react";
import { Navigate } from "react-router-dom";

function AdminProtected(props){
    if(localStorage.getItem("currentAdmin")){
        return props.children
    }else{
        return <Navigate to="/admin/login"/>
    }
}

export default AdminProtected