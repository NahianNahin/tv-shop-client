import { createBrowserRouter } from "react-router-dom";
import DashBoardLayouts from "../layouts/DashBoardLayouts";
import Main from "../layouts/Main";
import Blogs from "../pages/Blogs/Blogs";
import AddProduct from "../pages/Dashboard/AddProduct";
import AllBuyer from "../pages/Dashboard/AllBuyer";
import AllSeller from "../pages/Dashboard/AllSeller";
import MyOrder from "../pages/Dashboard/MyOrder";
import MyProduct from "../pages/Dashboard/MyProduct";
import Profile from "../pages/Dashboard/Profile";
import ReportedItems from "../pages/Dashboard/ReportedItems";
import Error404 from "../pages/Error/Error404";
import Home from "../pages/Home/Home";
import ProductsEachCategory from "../pages/Home/ProductsEachCategory";
import Login from "../pages/Login/Login";
import Signup from "../pages/Login/Signup";
import Payment from "../pages/Payment/Payment";
import AdminRoutes from "./AdminRoutes";
import BuyerRoutes from "./BuyerRoutes";
import PrivateRoute from "./PrivateRoute";
import SellerRoutes from "./SellerRoutes";

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
                loader: ({ params }) => params.id
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
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            },
            {
                path: '/dashboard/my_order',
                element: <BuyerRoutes><MyOrder></MyOrder></BuyerRoutes>
            },
            {
                path: '/dashboard/add_product',
                element: <SellerRoutes><AddProduct></AddProduct></SellerRoutes>
            },
            {
                path: '/dashboard/all_seller',
                element: <AdminRoutes><AllSeller></AllSeller></AdminRoutes>
            },
            {
                path: '/dashboard/all_buyer',
                element: <AdminRoutes><AllBuyer></AllBuyer></AdminRoutes>
            },
            {
                path: '/dashboard/my_product',
                element: <SellerRoutes><MyProduct></MyProduct></SellerRoutes>
            },
            {
                path: '/dashboard/reported_item',
                element: <AdminRoutes><ReportedItems></ReportedItems></AdminRoutes>
            },
            {
                path: '/dashboard/payment/:id',
                element: <BuyerRoutes><Payment></Payment></BuyerRoutes>,
                loader: ({ params }) => fetch(`http://localhost:5000/bookings/${params.id}`)
            }
        ]
    }

])