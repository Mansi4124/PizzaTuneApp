import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminMenu.css';

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [refetchMenu, setRefetchMenu] = useState(false);

  const handleRefetch = () => {
    setRefetchMenu(!refetchMenu);
  };

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/menu/`);
        setMenuItems(response.data.items);
      } catch (error) {
        console.error('There was an error fetching the menu items!', error);
      }
    };

    fetchMenuItems();
  }, [refetchMenu]);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setEditMode(true);
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/menu/${itemId}/delete/`);
      setMenuItems(menuItems.filter(item => item._id !== itemId));
    } catch (error) {
      console.error('There was an error deleting the menu item!', error);
    }
  };

  return (
    <div className="admin-menu-container">
      <h2>Manage Menu Items</h2>
      {editMode ? (
        <EditMenuForm item={selectedItem} setEditMode={setEditMode} handleRefetch={handleRefetch} />
      ) : (
        <div>
          <table className="admin-menu-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Image</th>
                <th>Is Veg</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map(item => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>{item.category}</td>
                  <td><img src={item.image_url} alt={item.name} width="50" /></td>
                  <td>{item.isVeg ? 'Yes' : 'No'}</td>
                  <td>
                    <span className="admin-menu-icon" onClick={() => handleEdit(item)}>✏️</span>
                    <span className="admin-menu-icon" onClick={() => handleDelete(item._id)}>🗑️</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// EditMenuForm component will handle the edit functionality
const EditMenuForm = ({ item, setEditMode, handleRefetch }) => {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);
  const [category, setCategory] = useState(item.category);
  const [image, setImage] = useState(null);
  const [isVeg, setIsVeg] = useState(item.isVeg);
  const [menuImage, setMenuImage] = useState(item.image_url);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('isVeg', isVeg);
    
    if (image) formData.append('image', image);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/menu/${item._id}/update/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setEditMode(false);
      handleRefetch();
    } catch (error) {
      console.error('There was an error updating the menu item!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-menu-edit-form">
      <h3>Edit Menu Item</h3>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
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
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">
          Image
          <a href={menuImage} target="_blank" rel="noopener noreferrer"> View Image</a>
        </label>
        <input
          type="file"
          id="image"
          onChange={(e) => setImage(e.target.files[0])}
        />
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
      <button type="submit">Update Item</button>
      <button type="button" onClick={() => setEditMode(false)} className="cancel-button">Cancel</button>
    </form>
  );
};

export default AdminMenu;
