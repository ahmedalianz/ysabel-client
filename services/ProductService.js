import axios from "axios";

class ProductService {
  static async getNewProducts() {
    try {
      let res = await axios(
        `${process.env.NEXT_PUBLIC_API_URL}/products/getNewProducts`
      );
      return res.data.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  static async getProductsByPageAndCategory(page, category) {
    try {
      let res = await axios(
        `${process.env.NEXT_PUBLIC_API_URL}/products/getProductsByPageAndCategory/${page}/${category}`
      );
      return res.data.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  static async getProducts() {
    try {
      let res = await axios(
        `${process.env.NEXT_PUBLIC_API_URL}/products/getProducts`
      );
      return res.data.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  static async uploadImage(data, productId, token) {
    try {
      let res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/uploadImage/${productId}`,
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

  static async addProduct(product, token) {
    try {
      let res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products/addProduct`,
        product,
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

  static async editProduct(product, token) {
    try {
      let res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/editProduct/${product._id}`,
        product,
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
  static async deleteProduct(productId, token) {
    try {
      let res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/products/deleteProduct/${productId}`,
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
export default ProductService;
