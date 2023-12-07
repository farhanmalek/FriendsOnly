import Post from '../components/Post'
import { useState, useEffect } from 'react'
import axios from "axios";

function Home() {
  const [allPosts, setAllPosts] = useState([])

async function getAllPosts() {
  try {
    const postGetter = await axios.get("http://localhost:5000/posts");
    setAllPosts(postGetter.data);
    
  } catch (error) {
    console.log(error, "failed to get your posts")
    
  }

}

useEffect(() => {
  getAllPosts()

},[])




  return (
    <div className='flex flex-col items-center gap-2'>
      <h1 className='font-bold'>Message Center</h1>
      <div className='flex flex-col gap-1'>
        {
          allPosts.map((post) => (
            <Post key={post._id} post={post} />
          ))
        }
     
      </div>

    </div>
  )
}

export default Home