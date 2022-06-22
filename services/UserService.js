import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";

class UserService {
  static async login(email, password) {
    try {
      let res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
        {
          email,
          password,
        }
      );
      return res.data;
    } catch (err) {
      console.log("login err", err.response);
      return err.response.data;
    }
  }
  static async logout(token) {
    try {
      let res = await axios(`${process.env.NEXT_PUBLIC_API_URL}/users/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === "success") {
        Cookies.remove("bakeryAdmin", { path: "/" });
        window.location.reload();
      } else {
        toast.error(t("error"));
      }
    } catch (err) {
      console.log("logout err", err.response);
    }
  }
  static async authorizeMe(token) {
    try {
      let res = await axios(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      console.log("auth err", err);
      return null;
    }
  }
  static async changePassword(password, token) {
    try {
      let res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/editPassword`,
        password,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      console.log("password err", err);
      return err.response.data;
    }
  }
}
export default UserService;
