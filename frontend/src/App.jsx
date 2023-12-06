import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import RootLayout from "./pages/RootLayout";

//import context
import { LoginProvider } from "./Contexts/LoginContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    // Parent route component, assign it an element which can be a layout, ie a navbar
    <Route
      path="/"
      element={
        <LoginProvider>
          <RootLayout />
        </LoginProvider>
      }
    >
      <Route index element={<Home />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
