import { createBrowserRouter } from "react-router-dom";
import DashBoardLayouts from "../layouts/DashBoardLayouts";
import Main from "../layouts/Main";
import Blogs from "../pages/Blogs/Blogs";
import AddProduct from "../pages/Dashboard/AddProduct";
import Error404 from "../pages/Error/Error404";
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
        },
        {
            path: '/*',
            element: <Error404></Error404>
        }
    ]
},
{
    path: '/dashboard',
    element: <DashBoardLayouts></DashBoardLayouts>,
    children: [
        {
            path: '/dashboard',
            element: <AddProduct></AddProduct>
        }
    ]
}

])