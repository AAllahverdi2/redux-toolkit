import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromBasket, increaseQuantity, decreaseQuantity } from '../REDUX/basketSlice/basketSlice';

const Basket = () => {
  const dispatch = useDispatch();
  const { items, totalPrice, count } = useSelector((state) => state.basket);

  const handleRemove = (id) => {
    dispatch(removeFromBasket(id));
  };

  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  return (
    <div className="container mt-5">
      <h1>Your Basket</h1>
      {items.length === 0 ? (
        <p>Your basket is empty.</p>
      ) : (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <button className='btn btn-info' onClick={() => handleDecrease(item.id)}>-</button>
                    {item.quantity || 1}
                    <button className='btn btn-danger' onClick={() => handleIncrease(item.id)}>+</button>
                  </td>
                  <td>${(item.price * (item.quantity || 1))}</td>
                  <td>
                    <button onClick={() => handleRemove(item.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <h4>Total Count: {count}</h4>
            <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
          </div>
        </>
      )}
    </div>
  );
};

export default Basket;
