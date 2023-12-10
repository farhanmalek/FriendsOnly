import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import LoginContext from "../Contexts/LoginContext";
import { useSnackbar } from "notistack";

function Login() {
  const { getUserData } = useContext(LoginContext);
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const formRef = useRef(null);
  const navigate = useNavigate();

  //Handle storing input values into the formData state.
  const handleInputChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  //Handle form submission to backend
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://friends-only-eosin.vercel.app/login",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        getUserData();
        enqueueSnackbar("Login successful!", { variant: "success" });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(`${error.response.data.message}`, { variant: "error" });
    
    }
    formRef.current.reset();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" w-[500px] min-w-[300px] ml-3 mr-3  bg-teal-200 rounded-md shadow-lg flex flex-col">
        <form
          className="flex flex-col gap-2 justify-evenly rounded-sm mt-2 p-2"
          onSubmit={handleFormSubmit}
          ref={formRef}
        >
          <input
            type="text"
            placeholder="Enter your email"
            className="p-1 rounded-md"
            name="username"
            onChange={handleInputChange}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="p-1 rounded-md"
            name="password"
            onChange={handleInputChange}
            required
          />

          <button className="bg-teal-500 hover:bg-teal-300 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
