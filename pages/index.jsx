import { useEffect } from "react";
import axios from 'axios'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

// import { EmblaCarousel } from '../components/EmblaCarousel'


export async function getServerSideProps(context){
  const secure = context.req.connection.encrypted
  
  const url = `${secure?"https":"http"}://${context.req.headers.host}/api/posts`
  
  const res = await axios.get(url)
  
  return {
      props:res.data
  }
}

const index = ({highlights, posts}) => {

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])
  useEffect(() => {
    if (emblaApi) {
      // Embla API is ready
    }
  }, [emblaApi])
  return (
    <div>
      <header>
        {/* {highlights.map(post=>{
            return <article>
              <div className=' h-96 overflow-hidden relative mt-10'>
                <img className='absolute -inset-y-1/2' src={post.image}></img>
                <div className='absolute w-full h-full bg-slate-900 flex flex-col justify-center items-center bg-opacity-70'>
                  <h1 className='font-bold text-6xl'>{post.title}</h1>
                  <p className='mt-5'>Lee mi ultima publicación aquí</p>
                </div>
              </div>
            </article>
          })
        } */}
        {highlights.map((post) => {
          return (
            <article key={post.id}>
              <div
                className="h-96 mt-10 bg-fixed"
                style={{ backgroundImage: `url(${post.image})` }}
              >
                <div className="w-full h-full bg-slate-900 flex flex-col justify-center items-center bg-opacity-70">
                  <h1 className="font-bold text-6xl">{post.title}</h1>
                  <p className="mt-5 text-slate-100">Lee mi ultima publicación aquí</p>
                </div>
              </div>
            </article>
          );
        })}
      </header>
      <h2 className="text-4xl font-bold mt-20 mb-10 text-center">
        Publicaciones más recientes
      </h2>
      <div className="embla" ref={emblaRef}>
        <div className="flex justify-items-center h-96">
          {posts.map((post) => {
            return (
              <div className="embla__slide" key={post.id}>
                <img className="object-contain h-80 min-w-full mx-auto mt-8" src={post.image}></img>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ); 
  
}


export default index

