import React from 'react'

function CreatePost({setCreatePost, createPost, user}) {

const handlePostCreation = async () => {

}












  return (
<div className="w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 flex justify-center items-center">
  <div className="bg-white w-[50vw] h-[60vh] flex flex-col justify-center items-center rounded-lg p-4">
    <h1 className="font-bold text-2xl mb-5 self-start">What's on your mind?</h1>
    <input
      type="text"
      placeholder="Title"
      className="border-2 border-gray-300 rounded-md p-2 mb-2 self-start w-[70%]"
    />
    <textarea
      type="text"
      placeholder="Body"
      className="border-2 border-gray-300 rounded-md p-2 mb-4 resize-none h-[50%] w-[70%] self-start"
    />
    <div className="flex gap-2 self-start">
      <button className="bg-blue-500 p-2 rounded hover:bg-blue-300" onClick={handleCreatePost}>Create Post</button>
      <button className="bg-red-600 p-2 rounded hover:bg-red-300" onClick={() => setCreatePost(!createPost)}>
        Cancel
      </button>
    </div>
  </div>
</div>

  )
}

export default CreatePost