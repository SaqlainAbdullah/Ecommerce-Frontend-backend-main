import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

// Import components
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import ProductForm from "./components/ProductForm";

function App() {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [productIdOfUpdate, setProductIdOfUpdate] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5050/products");
        console.log(res.data);
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescChange = (e) => {
    setDescription(e.target.value);
  };
  const handleImageURLChange = (e) => {
    setImageURL(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProduct = {
        id: products.length + 1,
        name: title,
        desc: description,
        imageUrl: imageURL,
      };
      await axios.post("http://localhost:5050/products", newProduct);

      setProducts([...products, newProduct]);
      alert("Saved");
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log(productIdOfUpdate);
      const updatedData = {
        name: title,
        desc: description,
        imageUrl: imageURL,
      };
      await axios.put(
        `http://localhost:5050/products/${productIdOfUpdate}`,
        updatedData
      );

      alert("Saved");
    } catch (err) {
      console.log(err);
    }
  };

  async function deleteProduct(id) {
    try {
      await axios.delete(`http://localhost:5050/products/${id}`);

      const updateProducts = products.filter((pr) => {
        if (pr.id != id) {
          return pr;
        }
      });
      setProducts(updateProducts);
      alert("Product Removed");
    } catch (err) {
      alert("Something went wrong");
      console.log(err);
    }
  }

  return (
    <>
      <Header />
      
      <main className="main">
        <div className="container">
          <div className="form-layout">
            <div className="form-column">
              <ProductForm 
                onSubmit={handleSubmit} 
                formType="add" 
              />
            </div>
            
            <div className="form-column">
              <ProductForm 
                onSubmit={handleUpdate} 
                formType="update" 
                initialData={products.find(p => p.id === productIdOfUpdate)}
              />
            </div>
          </div>
          
          <h2 className="form-title" style={{ marginTop: "2rem" }}>Our Products</h2>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard 
                key={product.id}
                product={product} 
                onUpdate={() => setProductIdOfUpdate(product.id)}
                onDelete={deleteProduct}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
