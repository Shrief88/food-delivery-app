import { createSlice } from "@reduxjs/toolkit";

import { IUser } from "@/model";

interface authState {
  accessToken: string | null;
  user: IUser | null;
}

const initialState: authState = {
  accessToken: null,
  user: null,
};

const authStateSlice = createSlice({
  name: "authState",
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      (state.accessToken = action.payload.accessToken),
        (state.user = action.payload.user);
    },
  },
});

export const authStateServices = {
  actions: authStateSlice.actions,
};

const authStateReducer = authStateSlice.reducer;

export default authStateReducer;
