



function Post({post}) {

  return (
    <div className="border border-black w-[85vw] min-h-[20vh] rounded-md shadow-md bg-blue-200 flex flex-col gap-1">
      <div className="flex justify-between mr-2 ml-2">
        <p>{post.title}</p>
        <p>{post.createdAt}</p>
      </div>
      <p className="ml-2">{post.user.firstname} {post.user.lastname}</p>

      <p className="ml-2">
        {post.body}
      </p>
    </div>
  );
}

export default Post;
