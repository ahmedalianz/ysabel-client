import CategoryService from "services/CategoryService";
import Filler from "components/HOME/Filler";
import Head from "next/head";
import ProductService from "services/ProductService";
import ProductsList from "components/HOME/PRODUCTS/ProductsList";
import { setCategories } from "redux/categories";
import { setProducts } from "redux/products";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "components/Loader/Loader";
export default function Home() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  let [cates, setCates] = useState([]);
  let [products, setProds] = useState([]);
  useEffect(() => {
    async function getProducts() {
      cates = await CategoryService.getAllCategories();
      setCates(cates);
      dispatch(setCategories(cates));
      if (cates.length) {
        products = await ProductService.getProducts();
        setProds(products);
        dispatch(setProducts(products));
      }
      setLoading(false);
    }
    getProducts();
  }, []);

  return (
    <div>
      <Head>
        <title>Ysabel</title>
        <meta name="description" content="order anything from here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Filler />
          <ProductsList />
        </>
      )}
    </div>
  );
}
