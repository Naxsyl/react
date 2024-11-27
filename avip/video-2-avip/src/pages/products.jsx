import Button from "../components/Elements/Button";
import CardProducts from "../components/Fragments/CardProducts";
import { useEffect, useRef, useState } from "react";
import { getProducts } from "../services/product.service";
import { useLogin } from "../Hooks/useLogin";
import TableCart from "../components/Fragments/TableCart";
import { Fragment } from "react";
import { Navbar } from "../components/Layouts/Navbar";
import { useContext } from "react";
import { DarkMode } from "../context/DarkMode";

const ProductsPage = () => {
  // const [cart, setCart] = useState([]);
  // const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const { isDarkMode, setIsDarkMode } = useContext(DarkMode);
  useLogin();

  useEffect(() => {
    getProducts((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <Fragment>
      <Navbar />
      <div
        className={`flex justify-center py-5 ${isDarkMode && "bg-slate-900"} `}
      >
        <div className="w-4/6 flex flex-wrap">
          {products.length > 0 &&
            products.map((product) => (
              <CardProducts key={product.id}>
                <CardProducts.Header image={product.image} id={product.id} />
                <CardProducts.Body name={product.title}>
                  {product.description}
                </CardProducts.Body>
                <CardProducts.Footer
                  price={product.price}
                  // handleAddToCart={handleAddToCart}
                  id={product.id}
                />
              </CardProducts>
            ))}
        </div>
        <div className="w-1/4 border-l-2 border-gray-300">
          <div className="py-5 border-b-2 border-gray-300 sticky top-0">
            <h1 className="text-3xl font-bold text-blue-600 mb-2 ml-5">Cart</h1>
            <TableCart products={products} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductsPage;
