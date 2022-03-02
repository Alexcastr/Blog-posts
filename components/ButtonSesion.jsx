import React from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useSession, signIn, signOut } from "next-auth/react"


const ButtonSesion = () => {
    const { data: session } = useSession()
    
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-100 text-xl font-medium hover:text-gray-100 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {session?.user?.role === "admin" && (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/admin"
                      className={
                        (active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-xl")
                      }
                    >
                      Inicio
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/admin/posts"
                      className={
                        (active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-xl")
                      }
                    >
                      Posts
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/admin/categories"
                      className={
                        (active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-xl")
                      }
                    >
                      Categories
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/admin/comments"
                      className={
                        (active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-xl")
                      }
                    >
                      Comments
                    </a>
                  )}
                </Menu.Item>
              </>
            )}

            <form method="POST" action="#">
              {session ? (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="submit"
                      onClick={() => signOut()}
                      className={
                        (active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block w-full text-left px-4 py-2 text-xl")
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
                        (active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block w-full text-left px-4 py-2 text-xl")
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