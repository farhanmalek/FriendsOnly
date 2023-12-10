import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import LoginContext from "../Contexts/LoginContext";
import { useSnackbar } from "notistack";

function ProModal({ proModal, setProModal }) {
  const { user } = useContext(LoginContext);
  const { enqueueSnackbar } = useSnackbar();
  const [code, setCode] = useState("");

  const handleCodeGuess = async () => {
    try {
      const response = await axios.put(
        "https://friends-only-eosin.vercel.app/pro",
        { code: code, user: user },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setProModal(!proModal);
        enqueueSnackbar("You are now a Pro member!", { variant: "success" });
        setTimeout(() => {
            window.location.reload(true);
        }, 2000);
      } 
    } catch (error) {
      console.log(error, "Failed from server");
      enqueueSnackbar("Invalid code!", { variant: "error" });
    }
  };

  return (
    <div className="w-screen h-[100vh] bg-black bg-opacity-50 absolute top-0 left-0 flex justify-center items-center ">
<div className="bg-white w-[80vw] h-auto md:max-w-[600px] flex flex-col justify-center items-center rounded-lg p-4 gap-1">
        <h1 className="text-2xl font-bold">
          Become a Pro member to create posts!
        </h1>
        <p>Enter the secret code and press Upgrade!:</p>
        <input
          className="border-2 border-gray-400 rounded-md p-1"
          type="text"
          placeholder="Secret Code"
          name="code"
          onChange={(e) => setCode(e.target.value)}
        />
        <div className="flex justify-evenly w-[80%] max-w-[350px]">
        <button
          className="bg-green-600 p-1 rounded  hover:bg-green-300"
          onClick={handleCodeGuess}
        >
          Upgrade
        </button>
        <button
          className="bg-red-600 p-1 rounded  hover:bg-red-300"
          onClick={() => setProModal(!proModal)}
        >
          Cancel
        </button>

        </div>
      
      </div>
    </div>
  );
}

export default ProModal;
