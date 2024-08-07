import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { axiosCategories, deleteData } from '../REDUX/categorySlice/Category.Slice'
import { Link } from 'react-router-dom'
import { addToWishList } from '../REDUX/wishListSlice/wishListSlice'
import { addToBasket } from '../REDUX/basketSlice/basketSlice'

const Table = () => {
  const dispatch = useDispatch()
  const { value: category } = useSelector((state) => state.category)
  console.log(category)
  useEffect(() => {
    dispatch(axiosCategories())
  }, [])
  return (
    <div>
                 <div style={{display:"flex", justifyContent:"center", alignItems:"center", fontSize:"30px"}}><strong>Redux</strong></div>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {
            category.map((item) => {
              return (
                <tr>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.price ? item.price : 'Price yoxdur deye basketde totalPrice ve price  islemiyecek bi dene priceli data post edin sonra  yoxlayin:)'}</td>
                  <td><button className='btn btn-info' onClick={() => {
                    dispatch(deleteData(item.id))
                  }}><i class="fa-regular fa-trash-can"></i></button></td>
                  <td>
                    <Link className='btn btn-danger' to={`/details/${item.id}`}><i class="fa-solid fa-circle-info"></i></Link>


                  </td>
                  <td><button className='btn btn-success' onClick={() => {
                    dispatch(addToWishList(item))
                  }}><i class="fa-regular fa-heart"></i></button></td>
                  <td> <button className='btn btn-info' onClick={() => dispatch(addToBasket(item))}>
                    <i className="fa-solid fa-basket-shopping"></i>
                  </button></td>
                  <td>  <Link className='btn btn-danger' to={`/edit/${item.id}`}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Table
