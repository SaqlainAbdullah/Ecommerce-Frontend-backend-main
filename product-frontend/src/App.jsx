import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

// Import components
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import ProductForm from "./components/ProductForm";

function App() {
  const [products, setProducts] = useState([]);
  const [productIdOfUpdate, setProductIdOfUpdate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5050/products");
      setProducts(res.data);
      setError("");
    } catch (err) {
      console.log(err);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle adding new product
  const handleAddProduct = async (productData) => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5050/products", productData);
      
      // Refresh products list from backend to ensure consistency
      await fetchProducts();
      alert("Product added successfully!");
    } catch (err) {
      console.log(err);
      alert("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle updating existing product
  const handleUpdateProduct = async (productData) => {
    if (!productIdOfUpdate) {
      alert("Please select a product to update first.");
      return;
    }

    try {
      setLoading(true);
      await axios.put(
        `http://localhost:5050/products/${productIdOfUpdate}`,
        productData
      );
      
      // Refresh products list from backend to ensure consistency
      await fetchProducts();
      setProductIdOfUpdate(null); // Clear the selection
      alert("Product updated successfully!");
    } catch (err) {
      console.log(err);
      alert("Failed to update product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting product
  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      setLoading(true);
      await axios.delete(`http://localhost:5050/products/${id}`);
      
      // Refresh products list from backend to ensure consistency
      await fetchProducts();
      
      // Clear update selection if the deleted product was selected
      if (productIdOfUpdate === id) {
        setProductIdOfUpdate(null);
      }
      
      alert("Product deleted successfully!");
    } catch (err) {
      console.log(err);
      alert("Failed to delete product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle selecting product for update
  const handleSelectForUpdate = (id) => {
    setProductIdOfUpdate(id);
  };

  // Clear update selection
  const handleClearUpdateSelection = () => {
    setProductIdOfUpdate(null);
  };

  return (
    <>
      <Header />
      
      <main className="main">
        <div className="container">
          {error && (
            <div className="alert alert-error" style={{ marginBottom: "1rem", padding: "1rem", backgroundColor: "#fee", border: "1px solid #fcc", borderRadius: "4px", color: "#c33" }}>
              {error}
            </div>
          )}
          
          <div className="form-layout">
            <div className="form-column">
              <ProductForm 
                onSubmit={handleAddProduct} 
                formType="add"
                loading={loading}
                key="add-form" // Force re-render to clear form
              />
            </div>
            
            <div className="form-column">
              <ProductForm 
                onSubmit={handleUpdateProduct} 
                formType="update" 
                initialData={products.find(p => p.id === productIdOfUpdate)}
                loading={loading}
                onClear={handleClearUpdateSelection}
                key={`update-form-${productIdOfUpdate}`} // Force re-render when selection changes
              />
            </div>
          </div>
          
          <h2 className="form-title" style={{ marginTop: "2rem" }}>Our Products</h2>
          
          {loading && (
            <div className="loading" style={{ textAlign: "center", padding: "2rem" }}>
              Loading...
            </div>
          )}
          
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard 
                key={product.id}
                product={product} 
                onUpdate={() => handleSelectForUpdate(product.id)}
                onDelete={() => handleDeleteProduct(product.id)}
                isSelected={productIdOfUpdate === product.id}
              />
            ))}
          </div>
          
          {products.length === 0 && !loading && (
            <div className="no-products" style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
              No products found. Add your first product above!
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
