import React, { useState, useEffect } from 'react';

const ProductForm = ({ onSubmit, initialData, formType, loading, onClear }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.name || '');
      setDescription(initialData.desc || '');
      setImageURL(initialData.imageUrl || '');
      setPrice(initialData.price || '');
    } else if (formType === 'update') {
      // Clear form when no product is selected for update
      setTitle('');
      setDescription('');
      setImageURL('');
      setPrice('');
    }
  }, [initialData, formType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: title,
      desc: description,
      imageUrl: imageURL,
      price: parseFloat(price) || 0
    });
    
    // Clear form if it's an add form
    if (formType === 'add') {
      setTitle('');
      setDescription('');
      setImageURL('');
      setPrice('');
    }
  };

  const handleClear = () => {
    setTitle('');
    setDescription('');
    setImageURL('');
    setPrice('');
    if (onClear) {
      onClear();
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">
        {formType === 'add' ? 'Add New Product' : 'Update Product'}
        {formType === 'update' && initialData && (
          <span style={{ fontSize: '14px', color: '#666', fontWeight: 'normal' }}>
            {' '}(Editing: {initialData.name})
          </span>
        )}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor={`title-${formType}`} className="form-label">Product Title</label>
          <input
            type="text"
            id={`title-${formType}`}
            className="form-control"
            placeholder="Enter product title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor={`price-${formType}`} className="form-label">Price ($)</label>
          <input
            type="number"
            id={`price-${formType}`}
            className="form-control"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0"
            step="0.01"
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor={`imageURL-${formType}`} className="form-label">Image URL</label>
          <input
            type="url"
            id={`imageURL-${formType}`}
            className="form-control"
            placeholder="Enter image URL"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor={`description-${formType}`} className="form-label">Description</label>
          <textarea
            id={`description-${formType}`}
            className="form-control"
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Processing...' : (formType === 'add' ? 'Add Product' : 'Update Product')}
          </button>
          
          {formType === 'update' && (
            <button 
              type="button" 
              onClick={handleClear}
              className="btn btn-secondary"
              disabled={loading}
              style={{ marginLeft: '10px' }}
            >
              Clear Selection
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductForm;