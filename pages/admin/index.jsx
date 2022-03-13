import React from 'react'
import { useSession } from 'next-auth/react';

const index = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session?.user?.role !== "admin" ? (
        <div> No eres Admin</div>
      ) : (
        <div>admin page</div>
      )}
    </div>
  );
};

export default index;

