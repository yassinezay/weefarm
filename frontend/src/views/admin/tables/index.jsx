import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from "./components/ProductList";

const Tables = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
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

  // Dynamic search
  useEffect(() => {
    const searchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query: searchQuery })
        });
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error searching products:', error);
      }
    };

    if (searchQuery) {
      searchProducts();
    } else {
      // Re-fetch all products if the search query is empty
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
    }
  }, [searchQuery]);

  const handleAddProduct = () => {
    navigate('/admin/tables/addproduct');
  };

  return (
    <div>
      <div className="mt-3 flex justify-between">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a product"
          className="border border-gray-300 rounded-lg p-2 w-1/2"
        />
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
