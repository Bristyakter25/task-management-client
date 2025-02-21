import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/Layout/MainLayout";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Login from "../components/authentication/Login";
import Register from "../components/authentication/Register";
import Dashboard from "../components/dashboard/Dashboard";
import AddTask from "../components/taskCategory/AddTask";
import MyTask from "../components/taskCategory/MyTask";
import UpdateTask from "../components/taskCategory/UpdateTask";
import Home from "../components/home/Home";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
          path:'/',
          element:<Home></Home>

        },
        {
            path:'login',
            element:<Login></Login>
        },
        {
            path:'register',
            element:<Register></Register>
        },
        {
          path:'dashboard',
          element:<Dashboard></Dashboard>,
          children:[
            {
              path:'addTask',
              element:<AddTask></AddTask>
            },
            {
              path:'myTasks',
              element:<MyTask></MyTask>
            },
            {
              path:'updateTask/:id',
              element:<UpdateTask></UpdateTask>
            },
          ]
        }
      ]
    },
  ]);