import axios from "axios";
import React, { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useSession } from "next-auth/react";
import RatingIcon from "../../../components/RatingIcon";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/router';
import { nanoid } from "nanoid";
import { motion } from "framer-motion"

export async function getServerSideProps(context) {
  const secure = context.req.connection.encrypted;

  const url = `${secure ? "https" : "http"}://${
    context.req.headers.host
  }/api/posts/${context.params.idPost}`;

  const res = await axios.get(url);

  return {
    props: {
      post: res.data,
    },
  };
}

export default function Post({ post }) {

  const { data: session } = useSession();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const comment = useRef(null)
  const router =useRouter()


  const onMouseEnter = (index) => {
    setHoverRating(index);
  };
  const onMouseLeave = () => {
    setHoverRating(0);
  };
  const onSaveRating = (index) => {
    setRating(index);
  };
  const starArray = [1,2,3,4,5]

  const saveComment = async (e)=> {

      e.preventDefault();
      await axios.post("/api/posts/comment",{
      name: session.user.name,
      email: session.user.email,
      message: comment.current.value,
      stars: rating,
      id: post.author.id,
      postTitle: post.title

    }).then(res=>{
      console.log(res)
      toast.info("Mensaje enviado con exito");
      router.push("/")
    
    }).catch(error=>{
      toast.error("Error enviando el mensaje", error);
    })

  }

  return (
    <>
      <div className="h-screen">
        <div className=" text-gray-200 bg-cyan-600 pt-10 pb-2 pl-2 rounded-md">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          {session ? (
            <p className="text-gray-200 text-sm mt-1">{post.author.name}</p>
          ) : (
            <div>Unknown</div>
          )}
        </div>

        <article className="prose prose-xl leading-10 prose-p:my-16 prose-invert p-5 md:0">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
      </div>

      <form onSubmit={saveComment}>
        <div className="flex justify-center">
          {session ? (
            <div>
              <img
                className="w-10 h-10 rounded-full"
                src={session.user.image}
                alt={session.user.name}
              />
            </div>
          ) : (
            <></>
          )}
          <motion.textarea
          whileFocus={{ scale: 1.2 }}
            required
            ref={comment}
            placeholder="Comentarios"
            className="border border-gray-800 w-96 h-60 p-2 ml-2 mb-2"
          />
        </div>

        {session ? (
          <div className="flex justify-center pb-4">
            {starArray.map((index) => {
              return (
                <motion.div 
                  whileHover={{
                  scale: 1.5,
                  transition: { duration: 1 },
                }}
                whileTap={{ scale: 1 }}
                key={nanoid()}>
                  <RatingIcon
                    index={index}
                    rating={rating}
                    hoverRating={hoverRating}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onSaveRating={onSaveRating}
                  />
                </motion.div>
              );
            })}
            <button
             
              type="submit"
              className=" ml-14 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full"
            >
              Publicar
            </button>
          </div>
        ) : (
          <div className="pb-2 text-lg text-center">
            Inicia sesion para agregar comentarios
          </div>
        )}
      </form>
      <ToastContainer autoClose={5000} />
    </>
  );
}
