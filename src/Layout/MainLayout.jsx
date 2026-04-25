import React from 'react'
import Home from '../pages/home';
import Header from '../components/Header';
import Products from '../pages/Products';
import ProductForm from '../pages/ProductForm';
import ProductDetails from '../pages/ProductDetails';
import NotFound from '../pages/NotFound';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SharedLayout from './SharedLayout';


function mainLayout() {
    return (
        <>

            <BrowserRouter>
                {/* //؛arent and child to show header and footer in all pages  */}
                <Routes>
                    {/* // sharedlayout declare outlet in main lay out to appeare in all routes */}
                    <Route path='/' element={<SharedLayout />}>
                        {/* //or using index == path="/" */}
                        <Route index element={<Home />} />
                        <Route path='products' element={<Products />} />
                        <Route path='products/:id/edit' element={<ProductForm />} />
                        <Route path='products/:id' element={<ProductDetails />} />
                    </Route>
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}


export default mainLayout;
