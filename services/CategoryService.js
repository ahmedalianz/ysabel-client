import axios from "axios";

class CategoryService {
  static async getAllCategories() {
    try {
      let res = await axios(
        `${process.env.NEXT_PUBLIC_API_URL}/products/getAllCategories`
      );
      return res.data.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  static async uploadImageCate(data, categoryId, token) {
    try {
      let res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/uploadImageCate/${categoryId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  static async addCategory(category, token) {
    try {
      let res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products/addCategory`,
        category,
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

  static async editCategory(category, categoryId, token) {
    try {
      let res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/editCategory/${categoryId}`,
        category,
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
  static async deleteCategory(categoryId, token) {
    try {
      let res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/products/deleteCategory/${categoryId}`,
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
export default CategoryService;
