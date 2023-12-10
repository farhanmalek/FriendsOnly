import axios from "axios";
import { useState } from "react";
import { useSnackbar } from "notistack";

function CreatePost({ setCreatePost, createPost, user }) {
  const [post, setPost] = useState({ title: "", body: "" });
  const { enqueueSnackbar } = useSnackbar();

  const handlePostCreation = async () => {
    try {
      const sendPostResponse = await axios.post("https://friends-only-eosin.vercel.app/createPost", {
        user,
        post,
      });
      if (sendPostResponse.status === 201) {
        setCreatePost(!createPost);

      }
      enqueueSnackbar("Post created!", { variant: "success" });
      setTimeout(() => {
          window.location.reload(true);
      }, 2000);


    } catch (error) {
      console.log(error);
      enqueueSnackbar(`${error.response.data.message}`, { variant: "error" });
    }
  };

  return (
    <div className="w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 flex justify-center items-center">
      <div className="bg-white w-[80vw] h-auto md:max-w-[600px] flex flex-col justify-center items-center rounded-lg p-4">
        <h1 className="font-bold text-2xl mb-5 self-center">
          What's on your mind?
        </h1>
        <input
          type="text"
          placeholder="Title"
          className="border-2 border-gray-300 rounded-md p-2 mb-2 self-start w-[100%]"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
        <textarea
          type="text"
          placeholder="Body"
          className="border-2 border-gray-300 rounded-md p-2 mb-4 resize-none w-[100%] self-start sm:h-[300px] h-[150px]"
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
      </div>
    </div>
  );
}

export default CreatePost;
