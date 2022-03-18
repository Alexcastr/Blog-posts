import React, { useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import dynamic from 'next/dynamic'
import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css'


import axios from 'axios'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const MarkDownEditor = dynamic(
    ()=>import("@uiw/react-markdown-editor").then((mod)=>mod.default),{
        ssr:false
    }
)

const create = () => {
    const router = useRouter()
    const {data:session} = useSession()
    const [content, setContent] = useState("");

    const titulo = useRef()
    const image = useRef()
    const highlight = useRef()

    if(session?.user?.role==="regular"){
      router.replace("/")
  }

    const saveContent = () => {
        //console.log(content);
        axios.post("/api/posts/create",{
            title:titulo.current.value,
            author:session.user,
            image:image.current.value,
            date: new Date(),
            highlight:highlight.current.checked,
            content,
        }).then(res=>{
          toast.success("Post creado con exito !")
            router.replace("/admin/posts")
        })
        .catch(error=>{
            //console.log(error)
            toast.error('Error creando post')
        })
      };
  return (
    <>
      <div className="p-7 h-screen">
        <input
          className="p-2 rounded-lg text-black mt-4 mr-2"
          type="text"
          ref={titulo}
          placeholder="Titulo de la publicación"
        ></input>
        <input
          className="p-2 rounded-lg text-black"
          type="text"
          ref={image}
          placeholder="Imagen de la publicación"
        ></input>
        <label className='ml-2' htmlFor="highlight">¿Highlight?</label>
        <input
          id="highlight"
          className="text-black"
          type="checkbox"
          ref={highlight}
        ></input>
        <MarkDownEditor
          className="mt-8"
          value={content}
          onChange={(editor, data, value) => {
            setContent(value);
          }}
        />
        {session?.user?.role !== "admin" ? (
          <div className="mt-5 text-center text-xl">
            No puedes crear posts, debes ser administrador
          </div>
        ) : (
          <button
            className="bg-cyan-600 text-black px-5 py-2 rounded-md mt-5"
            onClick={saveContent}
          >
            Guardar
          </button>
        )}
      </div>
      <ToastContainer autoClose={5000}/>
    </>
  );
}

export default create