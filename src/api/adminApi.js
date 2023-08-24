import { data } from "autoprefixer";
import adminRequest from "../utils/AdminRequest"

export  const AdminLogin = async  (data) => {
    console.log('login');
    return adminRequest.post("/login", data, {
      withCredentials: true,
    });
  };

export const AddCategory =async(data)=>{
  
  return adminRequest.post("/addcategory",data,{
   withCredentials:true,
 
  })
}

export const userManage = async(data)=>{

  return adminRequest.post(`/usermanage/${data}`,{
    withCredentials:true
  })
}

export const PayFreelancer = async(FreelancerId,Price,ProposalId)=>{
  return adminRequest.post("/payment",{
    FreelancerId,Price,ProposalId
  })
}
