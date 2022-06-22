import Cookies from "js-cookie";
import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin: null,
  },
  reducers: {
    setAdminData: (state, action) => {
      state.admin = action.payload;
      Cookies.set("bakeryAdmin", action.payload.token, {
        expires: 7,
        path: "/",
      });
    },
  },
});

export const { setAdminData } = adminSlice.actions;
export default adminSlice.reducer;
