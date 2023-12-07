import axios from "axios";
import { useState } from "react";

function CreatePost({ setCreatePost, createPost, user }) {
  const [post, setPost] = useState({ title: "", body: "" });
  const [message, setMessage] = useState("");

  const handlePostCreation = async () => {
    try {
      const sendPostResponse = await axios.post("http://localhost:5000/createPost", {
        user,
        post,
      });
      if (sendPostResponse.status === 201) {
        setCreatePost(!createPost);
        setMessage("Post created successfully!");

      }
      setTimeout(() => {
      window.location.reload(true);
      },1000);


    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 flex justify-center items-center">
      <div className="bg-white w-[50vw] h-[60vh] flex flex-col justify-center items-center rounded-lg p-4">
        <h1 className="font-bold text-2xl mb-5 self-start">
          What's on your mind?
        </h1>
        <input
          type="text"
          placeholder="Title"
          className="border-2 border-gray-300 rounded-md p-2 mb-2 self-start w-[70%]"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
        <textarea
          type="text"
          placeholder="Body"
          className="border-2 border-gray-300 rounded-md p-2 mb-4 resize-none h-[50%] w-[70%] self-start"
          value={post.body}
          onChange={(e) => setPost({ ...post, body: e.target.value })}
        />
        <div className="flex gap-2 self-start">
          <button
            className="bg-green-500 p-2 rounded hover:bg-blue-300"
            onClick={handlePostCreation}
          >
            Create Post
          </button>
          <button
            className="bg-red-600 p-2 rounded hover:bg-red-300"
            onClick={() => setCreatePost(!createPost)}
          >
            Cancel
          </button>
        </div>
        <p className="text-green-600">{message}</p>
      </div>
    </div>
  );
}

export default CreatePost;
