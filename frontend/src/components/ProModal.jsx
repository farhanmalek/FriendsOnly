import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import LoginContext from "../Contexts/LoginContext";

function ProModal({ proModal, setProModal }) {
  const { user } = useContext(LoginContext);

  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleCodeGuess = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/pro",
        { code: code, user: user },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setMessage("You are now a pro member!");
        setProModal(!proModal);
        window.location.reload(true);
      } else {
        setMessage("Wrong code!");
      }
    } catch (error) {
      console.log(error, "Failed from server");
    }
  };

  return (
    <div className="w-screen h-screen bg-black bg-opacity-50 absolute top-0 left-0 flex justify-center items-center ">
      <div className="bg-white w-[50vw] h-[50vh] flex flex-col justify-center items-center rounded-lg gap-2">
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
        {message.includes("Invalid") ? (
          <p className="text-red-600">{message}</p>
        ) : (
          <p className="text-green-600">{message}</p>
        )}
      </div>
    </div>
  );
}

export default ProModal;
