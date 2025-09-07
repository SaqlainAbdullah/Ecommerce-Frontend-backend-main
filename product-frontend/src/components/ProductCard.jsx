import React from 'react';

const ProductCard = ({ product, onUpdate, onDelete }) => {
  return (
    <div className="product-card">
      <img 
        src={product.imageUrl} 
        alt={product.name} 
        className="product-image" 
      />
      <div className="product-content">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-description">{product.desc}</p>
        
        <div className="product-actions">
          <button 
            onClick={() => onUpdate(product.id)} 
            className="btn btn-outline"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(product.id)} 
            className="btn btn-danger"
          >
            Delete
          </button>
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;