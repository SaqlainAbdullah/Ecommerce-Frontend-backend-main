import React, { useState, useEffect } from 'react';

const ProductForm = ({ onSubmit, initialData, formType }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.name || '');
      setDescription(initialData.desc || '');
      setImageURL(initialData.imageUrl || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: title,
      desc: description,
      imageUrl: imageURL
    });
    
    // Clear form if it's an add form
    if (formType === 'add') {
      setTitle('');
      setDescription('');
      setImageURL('');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">
        {formType === 'add' ? 'Add New Product' : 'Update Product'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">Product Title</label>
          <input
            type="text"
            id="title"
            className="form-control"
            placeholder="Enter product title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="imageURL" className="form-label">Image URL</label>
          <input
            type="text"
            id="imageURL"
            className="form-control"
            placeholder="Enter image URL"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            className="form-control"
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          {formType === 'add' ? 'Add Product' : 'Update Product'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;