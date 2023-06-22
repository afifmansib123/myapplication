import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from '@/pages/store';
import { Menu } from '@headlessui/react'
import DropdownLink from './DopdownLink';
import Cookies from 'js-cookie';
import NavbarBackground from '../public/images/navbar.png'; 


export default function Layout({ title, children }) {
  const { status, data: session } = useSession();

  const { state , dispatch} = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartitems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartitems]);


  const logoutclickhander = () => {
    Cookies.remove('cart')
    dispatch({type:"CART_RESET"})
    signOut({callbackUrl: '/login'})
  }

  return (
    <>
      <Head>
        <title>{title ? title + ' - Sunmi POS' : 'Sunmi POS'}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col justify-between">
        <header>
        <nav className="flex h-12 items-center px-4 justify-between shadow-md" style={{ backgroundImage: `url(${NavbarBackground.src})`, backgroundSize: 'cover' }}>
            
            <Link legacyBehavior href="/">
              <a className="text-lg font-bold"></a>
            </Link>
            <div>
              <Link legacyBehavior href="/cartscreen">
                <a className="p-2">
                  Cart
                  {cartItemsCount > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cartItemsCount}
                    </span>
                  )}
                </a>
              </Link>
              {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block ">
                  <Menu.Button className="text-blue-300">{session.user.name}</Menu.Button>
                  <Menu.Items className="absolute right-0 w-60 origin-top-right">
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">Profile</DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/order-history">Order history</DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <a href="#" className="dropdown-link" onClick={logoutclickhander}>
                        logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link legacyBehavior href="/login">
                  <a className="p-2">Login</a>
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>Copyright © 2022 Afif Mansib</p>
        </footer>
      </div>
    </>
  );
}
