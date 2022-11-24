import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Blogs from "../pages/Blogs/Blogs";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Login/Signup";

export const router = createBrowserRouter([
{
    path: '/',
    element: <Main></Main>,
    children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/blogs',
            element: <Blogs></Blogs>
        },
        {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/signup',
            element: <Signup></Signup>
        }
    ]
}
])