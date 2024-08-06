import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../REDUX/categorySlice/Category.Slice';
import './Add.css'; // Normal CSS

const Add = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCategory = { name, description, price };
    try {
      await dispatch(addCategory(newCategory)).unwrap();
      setName('');
      setDescription('');
      setPrice('');
    } catch (error) {
      console.error('Failed to save the category: ', error);
    }
  };

  return (
    <div className="container1">
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label className="label">Name</label>
          <input 
            className="input"
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>
        <div className="formGroup">
          <label className="label">Description</label>
          <input 
            className="input"
            type="text" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
        </div>
        <div className="formGroup">
          <label className="label">Price</label>
          <input 
            className="input"
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
          />
        </div>
        <button type="submit" className="button">Add Category</button>
      </form>
    </div>
  );
};

export default Add;
