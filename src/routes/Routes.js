import { createBrowserRouter } from "react-router-dom";
import DashBoardLayouts from "../layouts/DashBoardLayouts";
import Main from "../layouts/Main";
import Blogs from "../pages/Blogs/Blogs";
import AddProduct from "../pages/Dashboard/AddProduct";
import MyOrder from "../pages/Dashboard/MyOrder";
import Error404 from "../pages/Error/Error404";
import Home from "../pages/Home/Home";
import ProductsEachCategory from "../pages/Home/ProductsEachCategory";
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
            path: `/catagories/:id`,
            element: <ProductsEachCategory></ProductsEachCategory>,
            loader: ({params}) => fetch(`http://localhost:5000/products/${params.id}`)
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
            element: <MyOrder></MyOrder>
        },
        {
            path: '/dashboard/add_product',
            element: <AddProduct></AddProduct>
        }
    ]
}

])