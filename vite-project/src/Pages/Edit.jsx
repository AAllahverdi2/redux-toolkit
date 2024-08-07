import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetCategoryDetailQuery, useUpdateCategoryMutation } from '../services/CategorySlice/categortSlice'

const Edit = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: category, error, isLoading } = useGetCategoryDetailQuery(id)
    const [updateCategory] = useUpdateCategoryMutation()

    const [formData, setFormData] = useState({ name: '', description: '', price: '' })

    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name || '',
                description: category.description || '',
                price: category.price || '',
            })
        }
    }, [category])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await updateCategory({ id, ...formData }).unwrap()
            window.location.reload()
            navigate('/')
        } catch (error) {
            console.error(error)
        }
    }

    if (isLoading) return <div>Yüklənir...</div>
    if (error) return <div>Bir xəta baş verdi: {error.message}</div>

    return (
        <div>
            <h1>Kateqoriyanı Yenilə</h1>
            <form onSubmit={handleSubmit}>
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
                    placeholder="Kateqoriya"
                    required
                />
                <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Qiymət"
                    required
                />
                <button type="submit">Yenilə</button>
            </form>
        </div>
    )
}

export default Edit
