import React from 'react'

const Footer = () => {
  return (
    <div className="bg-cyan-600 text-gray-200 text-xl grid grid-cols-1 text-center  py-8 lg:flex lg:justify-evenly lg:py-8">
      <div>© Copyrigth 2022 <span className='text-gray-700 font-bold'>Digital Marketing</span> </div>
      
      <h2>Design by <span className='text-gray-700 font-bold'>Alex Castro</span></h2>

      <div>
        <i className="fa-brands fa-facebook"></i>
        <i className="fa-brands fa-linkedin xs:py-4 mx-2"></i>
        <i className="fa-brands fa-instagram"></i>
      </div>
    </div>
  );
}

export default Footer