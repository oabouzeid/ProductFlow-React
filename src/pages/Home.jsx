import React from 'react'
import { CustomButton } from '../StyledComponent/MainButton';

function  home ()  {
  return (
   <>
    <div className='container mt-5'>
      <div className='p-5 mb-4 bg-white rounded-3 shadow-sm border'>
        <div className='container-fluid py-5'>
          <h1 className='display-5 fw-bold text-primary'>Welcome to Store Admin</h1>
          <p className='col-md-8 fs-4 text-muted'>
            Manage your product inventory efficiently. Add, edit, or remove products with ease 
            using our modern and intuitive dashboard.
          </p>
          <CustomButton className="btn-lg mt-3" onClick={() => window.location.href='/products'}>
            View Inventory
          </CustomButton>
        </div>
      </div>

      <div className="row align-items-md-stretch">
        <div className="col-md-6 mb-4">
          <div className="h-100 p-5 text-white bg-primary rounded-3 shadow-sm">
            <h2>Product Analytics</h2>
            <p>Track your sales and performance metrics in real-time. Gain insights into your best-selling items.</p>
            <button className="btn btn-outline-light" type="button">Explore Data</button>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="h-100 p-5 bg-white border rounded-3 shadow-sm">
            <h2 className="text-primary">User Management</h2>
            <p>Control access levels and manage user permissions for your administrative team.</p>
            <button className="btn btn-outline-primary" type="button">Manage Users</button>
          </div>
        </div>
      </div>
    </div>
   </>
  )
}
export default home;
