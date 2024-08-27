import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from "./components/ProductList";

const Tables = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products/list');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    navigate('/admin/tables/addproduct');
  };

  return (
    <div>
      <div className="mt-3">
        <button
          onClick={handleAddProduct}
          className="linear mt-4 flex items-center justify-center rounded-xl bg-brand-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
        >
          Ajouter Produit
        </button>
      </div>
      <div className="mt-5">
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default Tables;
