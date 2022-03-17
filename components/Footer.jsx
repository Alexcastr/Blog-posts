import React from 'react'

const Footer = () => {
  return (
    <div className="bg-cyan-600 text-gray-200 text-xl font-bold flex justify-evenly py-8">
      <div>© Copyrigth 2022 <span className='text-gray-700'>Digital Marketing</span> </div>
      <div>
        <i className="fa-brands fa-facebook"></i>
        <i className="fa-brands fa-linkedin mx-2"></i>
        <i className="fa-brands fa-instagram"></i>
      </div>
      <h2>Design by <span className='text-gray-700'>Alex Castro</span></h2>
    </div>
  );
}

export default Footer