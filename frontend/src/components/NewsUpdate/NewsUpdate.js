import React from 'react';
import './NewsUpdate.css'; // Create a CSS file for styling

const NewsUpdates = () => {
  const updates = [
    {
      id: 1,
      title: "Exciting Menu Update!",
      content: "We've updated our menu with an amazing variety of new pizzas and sides! Come and explore our latest offerings."
    },
    {
      id: 2,
      title: "New Location Opening Soon!",
      content: "We're thrilled to announce that we will be opening a new location in downtown next month! Stay tuned for the grand opening date."
    },
    {
      id: 3,
      title: "Join Us for Pizza Night!",
      content: "Join us every Friday for Pizza Night! Enjoy special discounts and try our chef's special pizza."
    }
  ];

  return (
    <div className="news-updates">
      <h2>News & Updates</h2>
      {updates.map(update => (
        <div key={update.id} className="update-card">
          <h3>{update.title}</h3>
          <p>{update.content}</p>
        </div>
      ))}
    </div>
  );
};

export default NewsUpdates;
