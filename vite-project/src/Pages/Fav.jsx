import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishList } from '../REDUX/wishListSlice/wishListSlice';
import "./Fav.css"
import { Toaster } from 'react-hot-toast';
const Fav = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items); 

  console.log("wishlist", wishlist);

  const handleRemove = (id) => {
    dispatch(removeFromWishList(id));
  };

  return (
    <div className="container">
      <div className="row">
        {
          wishlist.map((item, index) => {
            return (
              <div className="col-lg-3">
                <div class="card" style={{width: "18rem;"}}>
                  <div class="card-body">
                    <h5 class="card-title">{item.name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">{item.description}</h6>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <button className='btn btn-success' onClick={()=>{
                      handleRemove(item.id)
                    }}>remove</button>
                   
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      <Toaster/>
    </div>
  );
};

export default Fav;
