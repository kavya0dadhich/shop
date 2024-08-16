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
import ProtectedRoute from "./components/ProtectedRoute";


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
    element: <ProtectedRoute element={<AdminDashboard />} />,
    children: [
      {
        index: true,
        element: <ProtectedRoute element={<Dashbord />} />,
      },
      {
        path: "/admin/purchase",
        element: <ProtectedRoute element={<Purchase />} />,
      },
      {
        path: "/admin/purchase/Add-purchase",
        element: <ProtectedRoute element={<AddPurchase />} />,
      },
      {
        path: "/admin/disbursement",
        element: <ProtectedRoute element={<Disbursement />} />,
      },
      {
        path: "/admin/disbursement/Add-disbursement",
        element: <ProtectedRoute element={<AddDisbursement />} />,
      },
      {
        path: "/admin/sales",
        element: <ProtectedRoute element={<Sales />} />,
      },
      {
        path: "/admin/sales/Add-sales",
        element: <ProtectedRoute element={<AddSales />} />,
      },
      {
        path: "/admin/setting/subCategory",
        element: <ProtectedRoute element={<SubCategory />} />,
      },
      {
        path: "/admin/setting/Category",
        element: <ProtectedRoute element={<Category />} />,
      },
      {
        path: "/admin/setting/shop",
        element: <ProtectedRoute element={<Shop />} />,
      },
      {
        path: "/admin/setting/add-shop",
        element: <ProtectedRoute element={<AddShop />} />,
      },
      {
        path: "/admin/setting/ml",
        element: <ProtectedRoute element={<ML />} />,
      },
      {
        path: "/admin/setting/add-ml",
        element: <ProtectedRoute element={<AddMl />} />,
      },
      {
        path: "/admin/setting/add-subCategory",
        element: <ProtectedRoute element={<AddSubCategory />} />,
      },
      {
        path: "/admin/setting/add-Category",
        element: <ProtectedRoute element={<AddCategoey />} />,
      },
      {
        path: "/admin/setting",
        element: <ProtectedRoute element={<UserProfile />} />,
      },
    ],
  },
]);

export default router;
