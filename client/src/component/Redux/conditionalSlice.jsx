import { createSlice } from "@reduxjs/toolkit";



const conditionalSlice = createSlice({
  name: "conditional",
  initialState:{
    friendList:false,
    notification:false,
  },
  reducers: {
    setFriendList(state, action) {
      state.friendList = action.payload;
    },
    setNotification(state,action){
      state.notification=action.payload;
    }
  },
});

export const { setFriendList,setNotification} = conditionalSlice.actions;
export default conditionalSlice.reducer;
