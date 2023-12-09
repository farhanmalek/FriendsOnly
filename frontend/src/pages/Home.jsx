import Post from '../components/Post'
import { useState, useEffect } from 'react'
import axios from "axios";
import LoginContext from "../Contexts/LoginContext";
import { useContext } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';


function Home() {
  const [allPosts, setAllPosts] = useState([])
  const { user } = useContext(LoginContext);
  const [isLoading, setIsLoading] = useState(false);



async function getAllPosts() {
  try {
    setIsLoading(true);
    const postGetter = await axios.get("http://localhost:5000/posts");
    setAllPosts(postGetter.data);
    
  } catch (error) {
    console.log(error, "failed to get your posts")
    
  }
  setIsLoading(false);

}

useEffect(() => {
  getAllPosts()

},[])




  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-bold text-3xl">Message Center</h1>
          <p className="max-w-[85wv]">Become a member and start contributing!</p>
          <div className="flex flex-col gap-5">
            {allPosts.length === 0 ? (
              <p>There are no posts yet.</p>
            ) : (
              allPosts.map((post) => <Post key={post._id} post={post} user={user} />)
            )}
          </div>
        </div>
      )}
    </>

  )
}

export default Home