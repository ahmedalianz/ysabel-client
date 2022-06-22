import axios from "axios";

class ThemeService {
  static async getTheme() {
    let theme = {
      colors: {
        background_color: "#faf0e6",
        buttons_color: "#63544d",
        font_color: "#000000",
      },
      currency: {
        en: "SR",
        ar: "ر.س",
      },
    };
    try {
      let res = await axios(
        `${process.env.NEXT_PUBLIC_API_URL}/theme/getTheme`
      );
      theme = res.data.data;
      return theme;
    } catch (err) {
      console.log(err);
      return theme;
    } finally {
      document.body.style.setProperty(
        "--background-color",
        theme.colors.background_color
      );
      document.body.style.setProperty(
        "--buttons-color",
        theme.colors.buttons_color
      );
      document.body.style.setProperty("--font-color", theme.colors.font_color);
    }
  }
  static async changeTheme(theme, token) {
    try {
      let res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/theme/changeTheme`,
        theme,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  }
}
export default ThemeService;
