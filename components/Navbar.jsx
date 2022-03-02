import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import ButtonSesion from './ButtonSesion';

const Navbar = () => {



  return (
    <nav className="container mx-auto border border-none bg-pink-50 absolute top-2 right-20">
      <div className="mx-4 flex justify-between ">
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,900&display=swap');
        </style>
        <div className="flex justify-start">
          <Image src="/Logotipo.jpeg" alt="logo" width={70} height={65} />
          <h1 className="my-auto text-xl robo text-gray-700">
            Marketing Digital
          </h1>
        </div>

        <ul className="flex justify-end gap-2 my-auto text-gray-700">
          
          <li className='pt-2'>
            <Link href="/recursos">
              <a className="text-xl hover:bg-slate-500 hover:text-gray-100 p-2 rounded-md">Recursos blog</a>
            </Link>
          </li>
          <li className='pt-2'>
            <Link href="/contacto">
              <a className="text-xl hover:bg-slate-500 hover:text-gray-100 p-2 rounded-md">Contacto</a>
            </Link>
          </li>
          <li>
            <ButtonSesion/>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar