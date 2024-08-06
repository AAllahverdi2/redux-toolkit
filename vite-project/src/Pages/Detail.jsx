import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosCategoryById } from '../REDUX/categorySlice/Category.Slice';
import { useParams } from 'react-router-dom';

const DetailPage = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category.selectedCategory);
  const status = useSelector((state) => state.category.status);
  const error = useSelector((state) => state.category.error);

  useEffect(() => {
    if (id) {
      dispatch(axiosCategoryById(id));
    }
  }, [id, dispatch]);

  return (
    <div>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && category && (
        <div>
          <h1>{category.name}</h1>
          <p>ID: {category.id}</p>
          <p>Description: {category.description}</p>
          {/* Diğer detayları buraya ekleyebilirsiniz */}
        </div>
      )}
    </div>
  );
};

export default DetailPage;
