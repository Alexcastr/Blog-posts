import React, { useEffect } from 'react'
import axios from "axios";
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'


export async function getServerSideProps(context){
  const secure = context.req.connection.encrypted
  
  const url = `${secure?"https":"http"}://${context.req.headers.host}/api/posts/all`
  
  const res = await axios.get(url)
  
  return {
      props:{
          posts:res.data
      }
  }
}


export const EmblaCarousel = ({posts}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()])

  useEffect(() => {
    if (emblaApi) {
      // Embla API is ready
    }
  }, [emblaApi])
 
  return (
    
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {posts.map((post) => {
          return (
            <div className="embla__slide" key={post.id}>
              <img className="" src={post.image}></img>
            </div>
          );

        })}  
      </div>
    </div>
  )
}



