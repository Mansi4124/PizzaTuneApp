import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/items/')
            .then(response => setItems(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Item List</h1>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item.name}: {item.description} - ${item.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;
