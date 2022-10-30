import React, { Children } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,

} from "react-router-dom";
import Root from "./routes";
import Error from "./error";
import Signup from "./components/signup"
import Login from "./components/login"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },

    ]},
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
