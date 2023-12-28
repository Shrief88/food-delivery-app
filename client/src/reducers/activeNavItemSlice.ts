import { createSlice } from "@reduxjs/toolkit";

interface activeNavItemState {
  activeNavItem : string
}

const initialState: activeNavItemState = {
  activeNavItem : window.location.pathname
}

const activeNavItemSlice = createSlice({
  name : "activeNavItem",
  initialState,
  reducers:{
    SetActiveNavItem : (state, action) => {
      state.activeNavItem = action.payload
    }
  }
})

export const activeNavItemServices = {
  actions: activeNavItemSlice.actions,
}

const activeNavItemReducer = activeNavItemSlice.reducer
export default activeNavItemReducer;