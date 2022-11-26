import { createBrowserRouter } from "react-router-dom";
import DashBoardLayouts from "../layouts/DashBoardLayouts";
import Main from "../layouts/Main";
import Blogs from "../pages/Blogs/Blogs";
import AddProduct from "../pages/Dashboard/AddProduct";
import AllBuyer from "../pages/Dashboard/AllBuyer";
import AllSeller from "../pages/Dashboard/AllSeller";
import MyOrder from "../pages/Dashboard/MyOrder";
import MyProduct from "../pages/Dashboard/MyProduct";
import ReportedItems from "../pages/Dashboard/ReportedItems";
import Error404 from "../pages/Error/Error404";
import Home from "../pages/Home/Home";
import ProductsEachCategory from "../pages/Home/ProductsEachCategory";
import Login from "../pages/Login/Login";
import Signup from "../pages/Login/Signup";
import Payment from "../pages/Payment/Payment";
import PrivateRoute from "./PrivateRoute";

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
    element: <PrivateRoute><DashBoardLayouts></DashBoardLayouts></PrivateRoute>,
    children: [
        {
            path: '/dashboard',
            element: <PrivateRoute><MyOrder></MyOrder></PrivateRoute>
        },
        {
            path: '/dashboard/add_product',
            element: <PrivateRoute><AddProduct></AddProduct></PrivateRoute>
        },
        {
            path: '/dashboard/all_seller',
            element: <PrivateRoute><AllSeller></AllSeller></PrivateRoute>
        },
        {
            path: '/dashboard/all_buyer',
            element: <PrivateRoute><AllBuyer></AllBuyer></PrivateRoute>
        },
        {
            path: '/dashboard/my_product',
            element: <PrivateRoute><MyProduct></MyProduct></PrivateRoute>
        },
        {
            path: '/dashboard/reported_item',
            element: <PrivateRoute><ReportedItems></ReportedItems></PrivateRoute>
        },
        {
            path: '/dashboard/payment/:id',
            element: <Payment></Payment>,
            loader: ({params}) => fetch(`http://localhost:5000/bookings/${params.id}`)
        }
    ]
}

])