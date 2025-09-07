import React from 'react';

const ProductCard = ({ product, onUpdate, onDelete, isSelected }) => {
  return (
    <div className={`product-card ${isSelected ? 'selected' : ''}`}>
      <img 
        src={product.imageUrl} 
        alt={product.name} 
        className="product-image" 
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
        }}
      />
      <div className="product-content">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">${product.price ? product.price.toFixed(2) : '0.00'}</p>
        <p className="product-description">{product.desc}</p>
        
        <div className="product-actions">
          <button 
            onClick={onUpdate} 
            className={`btn btn-outline ${isSelected ? 'btn-selected' : ''}`}
          >
            {isSelected ? 'Selected for Edit' : 'Edit'}
          </button>
          <button 
            onClick={onDelete} 
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