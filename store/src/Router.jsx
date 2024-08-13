import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "./dashboard/AdminDashboard";
import SubCategory from "./settings/subCategory/SubCategory";
import Category from "./settings/category/Category";
import Purchase from "./purchase/Purchase";
import Sales from "./sales/Sales";
import AddPurchase from "./purchase/Add-purchase";
import AddSales from "./sales/Add-sales";
import UserProfile from "./settings/userProfile/user-profile";
import AddCategoey from "./settings/category/add-categoey";
import AddSubCategory from "./settings/subCategory/add-subCategory";
import Dashbord from "./dashboard/dashbord";
import Login from './auth/login'
import Registration from "./auth/registration";
import Disbursement from "./disbursement/disbursement";
import AddDisbursement from "./disbursement/Add-disbursement";
import Shop from "./settings/shop/shop";
import AddShop from "./settings/shop/add-shop";
import ML from "./settings/ml/ml";
import AddMl from "./settings/ml/add-ml";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/registration",
    element: <Registration />
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
    children: [
      {
        index: true,
        element: <Dashbord />,
      },
      {
        path: "/admin/purchase",
        element: <Purchase />,
      },
      {
        path: "/admin/purchase/Add-purchase",
        element: <AddPurchase />,
      },
      {
        path: "/admin/disbursement",
        element: <Disbursement />,
      },
      {
        path: "/admin/disbursement/Add-disbursement",
        element: <AddDisbursement />,
      },
      {
        path: "/admin/sales",
        element: <Sales />,
      },
      {
        path: "/admin/sales/Add-sales",
        element: <AddSales />,
      },
      {
        path: "/admin/setting/subCategory",
        element: <SubCategory />,
      },
      {
        path: "/admin/setting/Category",
        element: <Category />,
      },
      {
        path: "/admin/setting/shop",
        element: <Shop />,
      },
      {
        path: "/admin/setting/add-shop",
        element: <AddShop />,
      },
      {
        path: "/admin/setting/ml",
        element: <ML />,
      },
      {
        path: "/admin/setting/add-ml",
        element: <AddMl />,
      },
      {
        path: "/admin/setting/add-subCategory",
        element: <AddSubCategory />,
      },
      {
        path: "/admin/setting/add-Category",
        element: <AddCategoey />,
      },
      {
        path: "/admin/setting",
        element: <UserProfile />,
      },
    ],
  },
]);

export default router;
