import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    id: "",
    username:"",
    email: "",
    image: "",
    isSeller:"",
    desc:"",
    country:"",
    

  
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUserDetails: (state, action) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.image = action.payload.image;
            state.isSeller = action.payload.isSeller
            state.country = action.payload.country
            state.desc = action.payload.desc

          } ,

          setSeller: (state, action) => {
            state.isSeller = action.payload.isSeller
            state.country = action.payload.country
            state.desc = action.payload.desc

          },
    
          LogoutDetails: (state, action) => {
            state.id ="";
            state.email = "";
            state.username = "";
            state.email="";
            state.isSeller="";
            state.country ="",
            state.desc = ""

          }   
    }
})

export const { setUserDetails ,LogoutDetails,setSeller} = userSlice.actions;
export default userSlice.reducer;