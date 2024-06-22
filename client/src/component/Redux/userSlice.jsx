import { createSlice } from "@reduxjs/toolkit";

const userslice=createSlice({
    name:'user',

    initialState:{
        loggedIn:false,
        addContactBox:false,
        currentUser: null,
        currentChat: null
        
    },

    reducers:{
        getuser(state,action){
            state.userData = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.loggedIn = true;
          },
          logoutUser: (state) => {
            state.user = null;
            state.loggedIn = false;
          },
          setcontactBox(state,action){
            state.addContactBox=action.payload;
          },
          setCurrentChatID(state, action) {
            state.currentChat = action.payload;
          }
    }
});

export const{getuser,setUser, logoutUser,setcontactBox, setCurrentChatID }=userslice.actions;
export default userslice.reducer;