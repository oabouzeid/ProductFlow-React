import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { CustomButton } from '../StyledComponent/MainButton';
import { addProduct, getAllProduct, getProductById, UpdateProduct } from '../../Api/ProductApi';
import { useNavigate, useParams } from 'react-router-dom';



function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [productForm, setProductForm] = useState({
    name: "",
    price: 0,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id !== "0") {
      getProductById(id).then((res) => setProductForm(res.data));
    }
  }, [id]);

  const inputHandler = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  }

  const validate = () => {
    const newErrors = {};
    if (!productForm.name.trim()) {
      newErrors.name = "Product name is required";
    }
    if (productForm.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }
    return newErrors;
  }

  const AddNewProduct = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (id === '0') {
        // Fetch all products to find the max numeric ID and increment it
        const res = await getAllProduct();
        const products = res.data;
        const numericIds = products
          .map(p => parseInt(p.id))
          .filter(id => !isNaN(id));
        
        const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;
        const newProduct = { 
          ...productForm, 
          id: (maxId + 1).toString() 
        };
        
        await addProduct(newProduct);
      } else {
        await UpdateProduct(id, productForm);
      }
      navigate("/products");
    } catch (err) {
      console.log("Error saving product", err);
    }
  }

  return (
    <>
      <div className='container mt-5 p-4 bg-white rounded shadow-sm' style={{ maxWidth: '600px' }}>
        <h1 className='text-center text-primary mb-4'>
          {id === "0" ? "Add New Product" : "Edit Product"}
        </h1>

        <Form onSubmit={AddNewProduct}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Product Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter Product Name"
              value={productForm.name}
              onChange={inputHandler}
              name='name'
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">Price ($)</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="Enter Price"
              value={productForm.price}
              onChange={inputHandler}
              name='price'
              isInvalid={!!errors.price}
            />
            <Form.Control.Feedback type="invalid">
              {errors.price}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-grid gap-2">
            <CustomButton type="submit">
              {id === "0" ? "Add Product" : "Update Product"}
            </CustomButton>
            <CustomButton 
              type="button" 
              className="btn-secondary" 
              style={{ backgroundColor: '#6c757d' }}
              onClick={() => navigate("/products")}
            >
              Cancel
            </CustomButton>
          </div>
        </Form>
      </div>
    </>
  )
}



export default ProductForm;