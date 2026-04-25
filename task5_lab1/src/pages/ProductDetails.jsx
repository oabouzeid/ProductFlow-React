import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa';
import { CustomButton } from '../StyledComponent/MainButton';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../../Api/ProductApi';

function ProductDetails() {
    const [product, setProduct] = useState({}); 
    const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id); 
        setProduct(res.data);
      } catch (err) {
        console.log("Error:", err);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <>
      <div className='container mt-5'>
        <div className='card shadow-sm border-0 rounded-4 overflow-hidden'>
          <div className='card-header bg-primary text-white p-4 text-center'>
            <h2 className='mb-0'>Product Information</h2>
          </div>
          <div className='card-body p-5'>
            <div className='row align-items-center'>
              <div className='col-md-8'>
                <div className='mb-4'>
                  <label className='text-muted small text-uppercase fw-bold'>Product ID</label>
                  <p className='fs-3 fw-bold text-dark'>#{product.id}</p>
                </div>
                <div className='mb-4'>
                  <label className='text-muted small text-uppercase fw-bold'>Product Name</label>
                  <p className='fs-2 fw-semibold text-primary'>{product.name}</p>
                </div>
                <div className='mb-4'>
                  <label className='text-muted small text-uppercase fw-bold'>Price</label>
                  <p className='fs-2 fw-bold text-success'>${product.price}</p>
                </div>
                <div className='rate mb-4'>
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className='fs-4 text-warning me-1'/>
                  ))}
                  <span className='ms-2 text-muted'>(5.0 Rating)</span>
                </div>
              </div>
              <div className='col-md-4 text-center'>
                <div className='p-4 bg-light rounded-4 border border-dashed'>
                  <p className='text-muted mb-0'>No image available</p>
                </div>
              </div>
            </div>
            
            <hr className='my-4' />
            
            <div className='d-flex justify-content-between'>
              <Link to="/products">
                <CustomButton style={{ backgroundColor: '#6c757d' }}> Back to Inventory </CustomButton>
              </Link>
              <Link to={`/products/${product.id}/edit`}>
                <CustomButton> Edit Product </CustomButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetails;