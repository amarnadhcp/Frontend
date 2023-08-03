import React from "react";
import { Navigate } from "react-router-dom";

function AdminPublic(props){
    if(localStorage.getItem("currentAdmin")){
        return <Navigate to="/admin"/>
    }else{
        <Navigate to="/admin/login"/>
        return props.children
    }
}

export default AdminPublic