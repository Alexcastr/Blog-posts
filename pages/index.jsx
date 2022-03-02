import React from 'react'
import Layout from '../components/Layout'
import { useSession } from "next-auth/react"

const index = () => {
  const { data: session } = useSession();
  return (
    <Layout>
      {session ? (
        <div className="container mx-auto bg-gray-100 border border-none h-screen">Este es el inicio</div>
      ) : (
        <div className="container mx-auto bg-gray-100 border border-none h-screen">
          cara de moneda
        </div>
      )}
    </Layout>
  );
};

export default index
