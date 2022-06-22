import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    language: "en",
    theme: {
      colors: {
        background_color: "#faf0e6",
        buttons_color: "#63544d",
        font_color: "#000000",
      },
      currency: {
        en: "SR",
        ar: "ر.س",
      },
    },
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setMainTheme: (state, action) => {
      state.theme = action.payload;
    },
    setThemeColor: (state, action) => {
      state.theme = { ...state.theme, colors: action.payload };
    },
    setThemeCurrency: (state, action) => {
      state.theme = { ...state.theme, currency: action.payload };
    },
  },
});

export const { setLanguage, setMainTheme, setThemeColor, setThemeCurrency } =
  themeSlice.actions;
export default themeSlice.reducer;
