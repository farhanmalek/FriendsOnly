import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import LoginContext from "../Contexts/LoginContext";
import axios from "axios";
import ProModal from "../components/ProModal";
import CreatePost from "../components/CreatePost";

function RootLayout() {
  const navigate = useNavigate();
  const { user } = useContext(LoginContext);
  const [proModal, setProModal] = useState(false);
  const [createPost, setCreatePost] = useState(false);

  //Handle Logout Function
  async function handleLogout() {
    try {
      const response = await axios.get("http://localhost:5000/logout", {
        withCredentials: true,
        credentials: "same-origin",
      });
      if (response.status === 200) {
        window.location.reload(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //Create a function that pops up the upgrade modal
  function handleProModal() {
    setProModal(!proModal);
  }

  function handleCreatePost() {
    setCreatePost(!createPost);
  }

  return (
    <div>
      <header className="w-screen h-[10vh] bg-blue-900 flex justify-between items-center ">
        <h1 className="font-bold text-xl ml-2">
          Friends<span className="text-white">Only</span>
        </h1>
        <div className="flex gap-2 mr-2">
          {!user ? (
            <button
              className="bg-blue-500 p-1 rounded hover:bg-blue-300"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          ) : user.memberStatus === "member" ? (
            <button
              className="bg-blue-500 p-1 rounded hover:bg-blue-300"
              onClick={handleProModal}
            >
              Upgrade to Pro
            </button>
          ) : (user.memberStatus === "pro" || user.memberStatus === "admin") && (
            <button
              className="bg-blue-500 p-1 rounded hover:bg-blue-300"
              onClick={handleCreatePost}
            >
              Create Post!
            </button>
          )}

          {user ? (
            <button
              className="bg-blue-500 p-1 rounded  hover:bg-blue-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <button
              className="bg-blue-500 p-1 rounded  hover:bg-blue-300"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </header>
      {proModal && <ProModal setProModal={setProModal} proModal={proModal} />}
      {createPost && <CreatePost setCreatePost={setCreatePost} createPost={createPost} user={user}/>}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
