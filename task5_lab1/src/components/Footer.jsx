import React from 'react'

 function Footer() {
  return (
<footer className='bg-white text-muted text-center p-4 mt-5 border-top shadow-sm'>
    <div className='container'>
        <p className='mb-0 fw-medium'>&copy; {new Date().getFullYear()} Store Admin | Designed by Omar Abouzeid</p>
    </div>
</footer>
  )
}



export default Footer;