import React from 'react'
import Navbar from './Navbar';

const Layout = ({children}) => {
  return (
    <div>
      <Navbar />
      <main className="bg-blue-100 static pt-24 pl-14">{children}</main>
      <footer className='bg-red-200'> footer</footer>
    </div>
  );
  
}

export default Layout