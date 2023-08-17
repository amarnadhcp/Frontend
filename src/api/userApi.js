import userRequest from "../utils/userRequest";

export async function UserLogin(user) {
  try {
    const data = await userRequest.post("auth/login", { ...user });
    return data;
  } catch (err) {
    return err;
  }
}

export const userRegister = (data) => {
  return userRequest.post("auth/register", data, {
    withCredentials: true,
  });
};

export const userRegisterWithGoogle = (data) => {
  return userRequest.post("auth/googleRegister", data, {
    withCredentials: true,
  });
};

export const userLoginwithGoogle = (data) => {
  return userRequest.post("/auth/googleLogin", data, {
    withCredentials: true,
  });
};

export const BecomeSeller = async (data) => {
  try {
    const response = await userRequest.post("users/seller", data, {
      withCredentials: true,
    });
    return response;
  } catch (error) {}
};

export const AddPost = async (data) => {
  try {
    const response = await userRequest.post("freelancer/addpost", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error in AddPost API call:", error);
    throw error;
  }
};

export const addMessage = async (from, to, msg) => {
  try {
    const data = await userRequest.post("/users/sentmsg", { from, to, msg });
    return data;
  } catch (error) {}
};

export const getAllMessages=async(from,to)=>{
  try {

      const data = await userRequest.get("users/getAllmessage",{
          params:{from,to}
      })
      return data;
  } catch (error) {
      
  }
}


export const senderDetails= async(senderId)=>{
  try {
      const data = await userRequest.get("/users/senderDetails",{
          params:{senderId:senderId}
      })
      return data
  } catch (error) {
      
  }}
