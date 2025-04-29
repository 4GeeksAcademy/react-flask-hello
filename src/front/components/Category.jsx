import React from 'react';
import '../assets/styles/category.css';

const Category = () => {
  return (
    <div className="category-container">
      <ul className="category-list">
        <li className="category-item">Videos</li>
        <li className="category-item">Podcasts</li>
        <li className="category-item">Tasks</li>
      </ul>
    </div>
  );
};

export default Category;
