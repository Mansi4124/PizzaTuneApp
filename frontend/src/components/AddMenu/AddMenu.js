import React, { useState } from 'react';
import axios from 'axios';
import './AddMenu.css';

const AddMenu = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [isVeg, setIsVeg] = useState(true);
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !price || !category || !image) {
      setMessage('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('image', image);
    formData.append('isVeg', isVeg);

    try {
      const response = await axios.post('http://localhost:8000/menu/add/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
      // Reset form fields after successful submission
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setImage(null);
      setImagePreview(null);
      setIsVeg(true);
    } catch (error) {
      console.error('There was an error adding the menu item!', error);
      setMessage('Error adding menu item');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  return (
    <div className="add-container">
      <h2 className="title">Add Menu Item</h2>
      <form onSubmit={handleSubmit} className="menu-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter item name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Enter item description"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="Enter item price"
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            placeholder="Enter item category"
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
          {imagePreview && <img src={imagePreview} alt="Image preview" className="image-preview" />}
        </div>
        <div className="form-group">
          <label htmlFor="isVeg">Is Vegetarian?</label>
          <input
            type="checkbox"
            id="isVeg"
            checked={isVeg}
            onChange={() => setIsVeg(!isVeg)}
          />
        </div>
        <button type="submit" className="submit-button">Add Menu Item</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default AddMenu;
