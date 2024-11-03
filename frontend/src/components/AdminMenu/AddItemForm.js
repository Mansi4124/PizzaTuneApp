import React, { useState } from 'react';
import axios from 'axios';
import './AddItemForm.css';

const AddItemForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newItem = { name, description, price };

        axios.post('http://localhost:8000/api/items/', newItem)
            .then(response => {
                alert('Item added successfully!');
                setName('');
                setDescription('');
                setPrice('');
            })
            .catch(error => console.error('There was an error!', error));
    };

    return (
        <form onSubmit={handleSubmit} className="add-item-form">
            <h3>Add New Item</h3>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="add-item-button">Add Item</button>
        </form>
    );
};

export default AddItemForm;
