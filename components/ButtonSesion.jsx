import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'


const ButtonSesion = () => {
  
  const { data: session } = useSession()

  
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-2 py-1 bg-gray-100 text-sm font-medium hover:text-gray-100 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          {session ? session.user.name : <div className="">Opciones</div>}

          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {session?.user?.role === "admin" && (
              <div className='flex flex-col text-right pr-2'>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/"
                      as={"/"}
                      className={ (active ? "bg-gray-100 text-gray-900" : " text-gray-200",
                      "block px-2 py-2 text-sm text-right")}
                    >
                      Inicio
                    </Link>
                  )}
                </Menu.Item>
                
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/admin/posts"
                      as={"/admin/posts"}
                      className={
                        (active ? "bg-gray-100 text-gray-900" : " text-gray-200",
                        "block px-2 py-2 text-sm text-right")
                      }
                    >
                      Posts
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/admin/posts/create"
                      as={"/admin/posts/create"}
                      className={
                        (active ? "bg-gray-100 text-gray-900" : "text-gray-200",
                        "block px-2 py-2 text-sm text-right")
                      }
                    >
                      Crear
                    </Link>
                  )}
                </Menu.Item>
                
              </div>
            )}

            <form method="POST">
              {session ? (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="submit"
                      onClick={() => signOut()}
                      className={
                        (active ? "bg-gray-100 text-gray-900" : " text-gray-200",
                        "block w-full text-right px-2 py-2 text-sm")
                      }
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              ) : (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="submit"
                      onClick={() => signIn()}
                      className={
                        (active ? "bg-gray-100 text-gray-900" : " text-gray-200",
                        "block w-full text-right px-2 py-2 text-sm")
                      }
                    >
                      Sign in
                    </button>
                  )}
                </Menu.Item>
              )}
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default ButtonSesion