import axios from 'axios'
import React from 'react'
import ReactMarkdown from "react-markdown"
import { useSession } from "next-auth/react"

export async function getServerSideProps(context){
    const secure = context.req.connection.encrypted
    
    const url = `${secure?"https":"http"}://${context.req.headers.host}/api/posts/${context.params.idPost}`
    
    const res = await axios.get(url)

    return {
        props:{
            post:res.data
        }
    }
}

export default function Post({post}) {
  const { data: session } = useSession();
  
  return (
    <div className="h-screen">
      <div className=" text-gray-200 bg-cyan-600 pt-10 pb-2 pl-2 rounded-md">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          {session?<p className="text-gray-200 text-sm mt-1">{post.author.name}</p> : <div>unknown</div>}
      </div>

      <article className="prose prose-xl leading-10 prose-p:my-16 prose-invert p-5 md:0">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>
    </div>
  );
}
