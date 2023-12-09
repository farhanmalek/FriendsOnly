import dayjs from "dayjs";



function Post({post, user}) {
  //Format the date
  const day = post.createdAt;
  const formattedDate = dayjs(day).format("DD/MM/YYYY h:m:sa");

  return (
    <div className="border border-black w-[65vw] min-h-[20vh] rounded-md shadow-md bg-gray-100 flex flex-col gap-1 text-xs sm:text">
      <div className="flex justify-between mr-2 ml-2 mt-1">
        <p className="font-bold italic">{user === "" ? "Login to view the title of this post" : post.title}</p>
        <p className="hidden sm:block sm:italic">{formattedDate}</p>
      </div>
      {
        user === "" ? <p className="ml-2 font-bold italic">Log in to see the creator of this post.</p> :
        <p className="ml-2">{post.user.firstname} {post.user.lastname}</p>

      }
      <hr className="border-t border-black"></hr>


      <p className="ml-2">
        {post.body}
      </p>
    </div>
  );
}

export default Post;
