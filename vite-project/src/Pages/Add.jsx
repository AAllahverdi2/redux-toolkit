import React, { useState } from 'react'
import { useAddCategoryMutation } from '../services/CategorySlice/categortSlice'
import './Add.css'
const Add = () => {
    const [formData, setFormData] = useState({ name: '', description: '', price: '' })
    const [addCategory] = useAddCategoryMutation()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleAdd = async (e) => {
        e.preventDefault()
        try {
            const response = await addCategory(formData).unwrap()
            console.log('Response:', response)
            setFormData({ name: '', description: '', price: '' })
            window.location.reload()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form onSubmit={handleAdd}>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
            />
            <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                required
            />
            <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                required
            />
            <button type="submit">Add</button>
        </form>
    )
}

export default Add
