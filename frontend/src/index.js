import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RegisterForm from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import store from "./Features/store";
import { Provider } from "react-redux";
import HomePage from "./pages/Home/Home";
import CreatePost from "./pages/Post/CreatePost";

const Routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <HomePage/>
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path:"/create",
    element: <CreatePost/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={Routes}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
