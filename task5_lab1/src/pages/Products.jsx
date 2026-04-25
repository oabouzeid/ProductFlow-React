import React, { useEffect, useState } from 'react'
import { CustomButton } from '../StyledComponent/MainButton';
import { Table } from 'react-bootstrap';
import { FaRegEye, FaEdit } from "react-icons/fa";
import { MdDeleteForever } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { deleteProduct, getAllProduct } from '../../Api/ProductApi';

function Products() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProduct();
        setProducts(res.data);
      } catch (err) {
        console.log("Error", err);
      }
    };
    fetchProducts();
  }, []);

  const deleteHandler = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
    } catch (err) {
      console.log("Error Deleting Product", err);
    }
  }

  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    
    if (searchCriteria === "id") {
      return product.id.toString() === query;
    } else if (searchCriteria === "name") {
      return product.name.toLowerCase().includes(query);
    } else if (searchCriteria === "price") {
      return product.price.toString().includes(query);
    } else {
      // "all" criteria
      return (
        product.id.toString() === query ||
        product.name.toLowerCase().includes(query) ||
        product.price.toString().includes(query)
      );
    }
  });

  return (
    <>
      <div className='container mt-4 p-4 bg-white rounded shadow-sm'>
        <h1 className='text-center text-primary mb-4'>Product Inventory</h1>
        <div className='d-flex justify-content-between align-items-center mb-4 gap-3'>
          <div className="input-group" style={{ maxWidth: '600px' }}>
            <span className="input-group-text bg-primary text-white border-primary">Search By</span>
            <select 
              className="form-select border-primary flex-grow-0" 
              style={{ width: '120px' }}
              value={searchCriteria}
              onChange={(e) => setSearchCriteria(e.target.value)}
            >
              <option value="all">All</option>
              <option value="id">ID</option>
              <option value="name">Name</option>
              <option value="price">Price</option>
            </select>
            <input 
              type='text' 
              className='form-control border-primary' 
              placeholder={`Type ${searchCriteria === 'all' ? 'anything' : searchCriteria}...`} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Link to="/products/0/edit"> 
            <CustomButton type="button" className="shadow-sm">
              <span className="me-1">+</span> Add Product
            </CustomButton>
          </Link>
        </div>

        <div className='table-responsive'>
          <Table hover className="align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Price</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td className="fw-bold">{product.name}</td>
                    <td className="text-success fw-semibold">{product.price} $</td>
                    <td>
                      <div className='d-flex justify-content-center gap-3'>
                        <Link title="Edit" to={`/products/${product.id}/edit`}>
                          <FaEdit size={24} color='var(--primary)' />
                        </Link>
                        <Link title="View" to={`/products/${product.id}`}>
                          <FaRegEye size={24} color='var(--success)' />
                        </Link>
                        <MdDeleteForever 
                          title="Delete" 
                          size={24} 
                          color='var(--danger)' 
                          style={{ cursor: 'pointer' }}
                          onClick={() => deleteHandler(product.id)} 
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-muted">
                    No products found matching "{searchQuery}"
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  )
}

export default Products;