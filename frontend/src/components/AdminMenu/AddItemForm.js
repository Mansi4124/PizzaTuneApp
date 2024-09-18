import React, { useState } from 'react';
import axios from 'axios';

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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
            </div>
            <div>
                <label>Price:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Item</button>
        </form>
    );
};

export default AddItemForm;
