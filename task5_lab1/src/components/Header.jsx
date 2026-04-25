import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function Header() {
    return (
        <>
            <Navbar bg="white" className="shadow-sm mb-4">
                <Container>
                    <Navbar.Brand href="/" className="fw-bold text-primary">Store Admin</Navbar.Brand>
                    <Nav className="ms-auto">
                        <NavLink 
                            className={({ isActive }) =>
                                isActive ? "nav-link fw-bold text-primary" : "nav-link"
                            } 
                            to="/"
                        >
                            Home
                        </NavLink>
                        <NavLink 
                            className={({ isActive }) =>
                                isActive ? "nav-link fw-bold text-primary" : "nav-link"
                            } 
                            to="/products"
                        >
                            Products
                        </NavLink>
                        <NavLink 
                            className={({ isActive }) =>
                                isActive ? "nav-link fw-bold text-primary" : "nav-link"
                            } 
                            to="/login"
                        >
                            Login
                        </NavLink>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}


export default Header;
