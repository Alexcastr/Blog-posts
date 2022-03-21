import {useState} from 'react'
// import { Dialog } from "@material-ui/core";
import { motion } from "framer-motion"

import Link from 'next/link'
import axios from 'axios'



export async function getServerSideProps(context) {


  const secure = context.req.connection.encrypted;

  const url = `${secure ? "https" : "http"}://${
    context.req.headers.host
  }/api/posts/all`;

  const res = await axios.get(url);

  return {
    props: {
      posts: res.data,
    },
  };
}

export default function Posts({ posts }) {

  // const [showComments, setShowComments] = useState(false)

  

  return (
    <>
      <div className="text-xl text-center text-gray-200 bg-cyan-600 py-4 mb-4">
        Todo lo que necesitas saber sobre marketing digital 📱
      </div>
      {/* <Link href="/admin/posts/create">Crear nueva publicación</Link> */}

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {posts.map((post) => {
          return (
            <motion.article
              drag="x"
              dragConstraints={{ left: -100, right: 100 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-gray-500 p-5 m-1 rounded-md"
              key={post.id}
            >
              <div className="flex items-center mb-5">
                <img
                  className="h-10 w-10 rounded-full mr-3"
                  src={post.author.image}
                ></img>
                <div className="flex flex-col justify-center">
                  <p className="text-gray-200 text-lg font-semibold">
                    {post.author.name}
                  </p>
                  <p className="text-xs text-gray-200">
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                  {/* <p className='text-xs'>{new Date(post.date).toLocaleTimeString()}</p> */}
                </div>
              </div>
              <Link href={`/admin/posts/${post.id}`}>
                <img
                  className="cursor-pointer hover:bg-gray-700 size"
                  src={post.image}
                ></img>
              </Link>
              <h3 className="text-xl font-bold">{post.title}</h3>
              <p className="text-sm text-gray-200 text-justify mb-3 shortText">
                {post.content}
              </p>
              {/* <button
                className='bg-cyan-600 text-black px-5 py-2 rounded-md mt-5"'
                onClick={() => setShowComments(true)}
              >
                Show Comments
              </button> */}
            </motion.article>
          );
        })}
      </section>
      {/* <Dialog open={showComments} onClose={() => setShowComments(false)}>
        <div>comentarios</div>
      </Dialog> */}
    </>
  );
}
