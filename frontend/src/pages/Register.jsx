import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

function Register() {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
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
      if (formData.password !== e.target.passwordConfirm.value) {
        enqueueSnackbar("Passwords do not match!", { variant: "error" });
        formRef.current.reset();
        return;
      }
      const response = await axios.post("http://localhost:5000/register", {
        email: formData.email,
        firstname: formData.firstname,
        lastname: formData.lastname,
        password: formData.password,
      },
      {
        withCredentials: true,
      });
      enqueueSnackbar("Registration successful!", { variant: "success" });
        navigate("/login");
 
    } catch (error) {
     enqueueSnackbar(`${error.response.message}`, { variant: "error" });
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
            name="email"
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            placeholder="Enter your first name"
            className="p-1 rounded-md"
            name="firstname"
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            placeholder="Enter your last name"
            className="p-1 rounded-md"
            name="lastname"
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
          <input
            type="password"
            placeholder="Confirm your password"
            className="p-1 rounded-md"
            name="passwordConfirm"
            required
          />
          <button className="bg-teal-500 hover:bg-teal-300 text-white font-bold py-2 px-4 rounded">
            Register
          </button>
        </form>
      
      </div>
    </div>
  );
}

export default Register;
