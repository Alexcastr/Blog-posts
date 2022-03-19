import React, { useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router';

import axios from 'axios'

const index = () => {

  const { data: session } = useSession();
  const router =useRouter()


  const nombre = useRef(null)
  const correo = useRef(null)
  const mensaje = useRef(null)

  const saveMessage = async (e)=>{

      e.preventDefault();
      await axios.post("/api/contacto",{
      name: nombre.current.value,
      email:correo.current.value,
      message: mensaje.current.value,
    }).then(res=>{
      console.log(res)
      toast.info("Mensaje enviado con exito");
      router.push("/")
    
    }).catch(error=>{
      toast.error("Error enviando el mensaje", error);
    })

  }

  return (
    <div className="h-screen">
      <div className="flex justify-center pt-56">
        <section className=" mr-12">
          <h1>CONTACTANOS</h1>
          <p className="mt-4">Dirección mz c </p>
          <p>Mountaind view</p>

          <p className="mt-4">Tel: 32048543</p>
          <p>Email: info@gmail.com</p>

          <div className="mt-4 text-xl">
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-linkedin mx-2"></i>
            <i className="fa-brands fa-instagram"></i>
          </div>

          <p className="mt-4">
            Lunes - Viernes <span> 9:00 AM - 5:00 PM</span>
          </p>
        </section>
        <section>
          <form onSubmit={saveMessage} className='grid grid-cols-1'>
            <input className='pl-2' required type="text" ref={nombre} placeholder={session? session.user?.name:"Nombre"}/>
            <input className='my-2 pl-2' required type="email" ref={correo} placeholder={session? session.user?.email:"Email"}/>

            <textarea required className='mb-4 pl-2' ref={mensaje} cols="30" rows="5" placeholder="Mensaje"/>
           
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              ENVIAR
            </button>
          </form> 
          <ToastContainer autoClose={5000}/>
        </section>
      </div>
    </div>
  );
}

export default index