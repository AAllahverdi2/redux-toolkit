import React from 'react'
import { useDeleteCategoryMutation, useGetCategoriesQuery } from '../services/CategorySlice/categortSlice'
import { useDispatch } from 'react-redux'
import { addToBasket } from '../REDUX/basketSlice/basketSlice'
import { addToWishList } from '../REDUX/wishListSlice/wishListSlice'
import { Link } from 'react-router-dom'

const Query = () => {
    const { data, refetch, error, isLoading } = useGetCategoriesQuery('')
    const [deleteCategory] = useDeleteCategoryMutation()
    console.log("query", data)
    console.log("query", error)
    console.log("query", isLoading)
    const dispatch = useDispatch()
    const handerDelete = async (id) => {
        await deleteCategory(id)
        refetch()
    }
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "30px" }}><strong>Query</strong></div>
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
                        data && data.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.price ? item.price : 'Price yoxdur deye basket islemiyecek bi dene priceli data post edin sonra basketi yoxlayin:)'}</td>
                                    <td><button className='btn btn-info' onClick={() => handerDelete(item.id)}><i class="fa-regular fa-trash-can"></i></button></td>
                                    <td>
                                        <Link className='btn btn-danger' to={`/details/${item.id}`}>  <i class="fa-solid fa-circle-info"></i></Link>


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

export default Query
