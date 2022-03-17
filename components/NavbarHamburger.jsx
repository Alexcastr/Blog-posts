import {useState} from 'react'
import ButtonSesion from './ButtonSesion';
import Link from 'next/link';

const NavbarHamburger = ({}) => {
 
  const [navbarOpen, setNavbarOpen] = useState(false)
  
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-gray-500">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-black"
              href="/"
            >
              Marketing<span className='text-gray-200'> Digital</span>
            </a>
            <button
              className="text-black cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item px-4 my-1 hover:bg-gray-200 rounded-md ">
                <Link
                  href="/admin/posts/create"
                  as={"/admin/posts/create"}
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75"
                >
                  <a>
                    <i className="fas fa-sticky-note text-lg leading-lg text-black opacity-75"></i>
                    <span className="ml-1">Blog</span>
                  </a>
                </Link>
              </li>
              <li className="nav-item px-4 my-1 hover:bg-gray-200 rounded-md">
                <Link
                  href="/contacto"
                  as={"/contacto"}
                  className=" py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75"
                >
                  <a>
                    <i className="fas fa-user text-lg leading-sm text-black opacity-75"></i>
                    <span className="ml-1">Contacto</span>
                  </a>
                </Link>
              </li>
              <li className="ml-2 my-1 nav-item">
                <ButtonSesion />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavbarHamburger