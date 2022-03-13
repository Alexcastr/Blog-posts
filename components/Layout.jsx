import React from 'react'
import NavbarHamburger from './NavbarHamburger';


const Layout = ({children}) => {
 
  return (
    <div>
      <NavbarHamburger/>
      
      <main className="bg-blue-100 py-4 px-6 h-fit">
        <section className="container mx-auto bg-gray-100 border border-none">{children}</section>
      </main>

      <footer className='bg-red-200 text-center'> footer</footer>
    </div>
  );
  
}

export default Layout