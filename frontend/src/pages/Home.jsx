import Post from '../components/Post'
import { useState, useEffect } from 'react'
import axios from "axios";
import LoginContext from "../Contexts/LoginContext";
import { useContext } from 'react';

function Home() {
  const [allPosts, setAllPosts] = useState([])
  const { user } = useContext(LoginContext);


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
      <h1 className='font-bold text-3xl'>Message Center</h1>
      <p className='max-w-[85wv]'>Become a member and start contributing!</p>
      <div className='flex flex-col gap-5'>
        {
          allPosts.map((post) => (
            <Post key={post._id} post={post} user = {user} />
          ))
        }
     
      </div>

    </div>
  )
}

export default Home