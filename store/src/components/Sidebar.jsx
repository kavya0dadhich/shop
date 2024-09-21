import {
  // AiTwotoneBuild,
  BiSolidCategory,
  BiSolidPurchaseTag,
  CiLogout,
  CiMenuFries,
  // CiShop,
  FcSalesPerformance,
  GiVerticalFlip,
  ImProfile,
  Link,
  MdCategory,
  useLocation,
  useState,
  Tooltip,
  useRef,
  Toast,
  useNavigate,
  AiOutlineStock,
} from "../share/dependencies";
import Cookies from "js-cookie";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ onDataSend }) => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [active, setActive] = useState("");
  const [Thide, setThide] = useState(false);
  const location = useLocation();
  const toast = useRef(null);
  const currentPath = location.pathname;

  const handleActive = (path) => {
    setActive(path);
  };
  const TextNone = () => {
    setThide(!Thide);
    sendDataToParent();
  };
  const sendDataToParent = () => {
    onDataSend(Thide);
  };
  const LogOut = () => {
    toast.current.show({
      severity: "success",
      life: 3000,
      summary: "Success",
      detail: "Log-Out successfully",
    });
    setTimeout(() => {
      navigate("/");
      Cookies.remove("token");
    }, 1000);
  };
  return (
    <div
      className={`bg-[#266663] h-[95vh] rounded-xl max-[1440px]:p-1 overflow-hidden ${
        Thide ? "p-3" : "p-4"
      }`}
    >
      <div>
        <div className="flex justify-between items-center px-4 py-2">
          {Thide ? null : (
            <ul className="text-3xl mt-1 max-[903px]:w-full ">
              <Link to={"/admin"} className="logo text-[#fff] ">
                logo
              </Link>
            </ul>
          )}
          <ul className="text-3xl mt-1 max-[1318px]:hidden cursor-pointer text-white">
            <CiMenuFries onClick={TextNone} />
          </ul>
        </div>
        <ul className="mt-20 mb-3">
          <Link to="/admin/purchase">
            <li
              onClick={() => handleActive("/admin/purchase")}
              className={`hover:bg-[#c0fb86] hover:shadow-md transition-all duration-200 hover:text-[#3b7b68] mb-3 px-4 py-2 text-xl font-[500] ${
                currentPath === "/admin/purchase"
                  ? "bg-[#c0fb86] shadow-md text-[#3b7b68] "
                  : "text-white"
              } flex items-center gap-2 ${
                Thide ? "w-[100%] mt-3" : "w-72"
              } rounded-full cursor-pointer purchase`}
            >
              <Tooltip
                target=".purchase"
                content="Purchase"
                position="right"
                event=""
              />
              <BiSolidPurchaseTag />
              <p className={Thide ? `hidden` : `M-hide`}>Purchase</p>
            </li>
          </Link>
          <Link to="/admin/sales">
            <li
              onClick={() => handleActive("/admin/sales")}
              className={`hover:bg-[#c0fb86] hover:shadow-md transition-all duration-200 hover:text-[#3b7b68] mb-3 px-4 py-2 text-xl font-[500] ${
                currentPath === "/admin/sales"
                  ? "bg-[#c0fb86] shadow-md text-[#3b7b68] "
                  : "text-white"
              } flex items-center gap-2 ${
                Thide ? "w-[100%] mt-3" : "w-72"
              } rounded-full cursor-pointer sales`}
            >
              <Tooltip
                target=".sales"
                content="Sales"
                position="right"
                event=""
              />
              <FcSalesPerformance />
              <p className={Thide ? `hidden` : `M-hide`}>Sales</p>
            </li>
          </Link>
          <Link to="/admin/disbursement">
            <li
              onClick={() => handleActive("/admin/disbursement")}
              className={`hover:bg-[#c0fb86] hover:shadow-md transition-all duration-200 hover:text-[#3b7b68] mb-3 px-4 py-2 text-xl font-[500] ${
                currentPath === "/admin/disbursement"
                  ? "bg-[#c0fb86] shadow-md text-[#3b7b68] "
                  : "text-white"
              } flex items-center gap-2 ${
                Thide ? "w-[100%] mt-3" : "w-72"
              } rounded-full cursor-pointer disbursement`}
            >
              <Tooltip
                target=".disbursement"
                content="Disbursement"
                position="right"
                event=""
              />
              <GiVerticalFlip />
              <p className={Thide ? `hidden` : `M-hide`}>Disbursement</p>
            </li>
          </Link>
          <Link to="/admin/total-stock">
            <li
              onClick={() => handleActive("/admin/total-stock")}
              className={`hover:bg-[#c0fb86] hover:shadow-md transition-all duration-200 hover:text-[#3b7b68] mb-3 px-4 py-2 text-xl font-[500] ${
                currentPath === "/admin/total-stock"
                  ? "bg-[#c0fb86] shadow-md text-[#3b7b68] "
                  : "text-white"
              } flex items-center gap-2 ${
                Thide ? "w-[100%] mt-3" : "w-72"
              } rounded-full cursor-pointer total-stock`}
            >
              <Tooltip
                target=".total-stock"
                content="Total Stock"
                position="right"
                event=""
              />
              <GiVerticalFlip />
              <p className={Thide ? `hidden` : `M-hide`}>Total Stock</p>
            </li>
          </Link>
          <Link to="/admin/O-stock">
            <li
              onClick={() => handleActive("/admin/O-stock")}
              className={`hover:bg-[#c0fb86] hover:shadow-md transition-all duration-200 hover:text-[#3b7b68] mb-3 px-4 py-2 text-xl font-[500] ${
                currentPath === "/admin/O-stock"
                  ? "bg-[#c0fb86] shadow-md text-[#3b7b68] "
                  : "text-white"
              } flex items-center gap-2 ${
                Thide ? "w-[100%] mt-3" : "w-72"
              } rounded-full cursor-pointer Ostock`}
            >
              <Tooltip
                target=".Ostock"
                content="Opening Stock"
                position="right"
                event=""
              />
              <AiOutlineStock />
              <p className={Thide ? `hidden` : `M-hide`}>Opening Stock</p>
            </li>
          </Link>
        </ul>
        <hr />
        <ul className="mt-3">
          <Link to="/admin/setting">
            <li
              onClick={() => handleActive("/admin/setting")}
              className={`hover:bg-[#c0fb86] hover:shadow-md transition-all duration-200 hover:text-[#3b7b68] mb-3 px-4 py-2 text-xl font-[500] ${
                currentPath === "/admin/setting"
                  ? "bg-[#c0fb86] shadow-md text-[#3b7b68] "
                  : "text-white"
              } flex items-center gap-2 ${
                Thide ? "w-[100%] mt-3" : "w-72"
              } rounded-full cursor-pointer setting`}
            >
              <Tooltip
                target=".setting"
                content="User Profile"
                position="right"
                event=""
              />
              <ImProfile />
              <p className={Thide ? `hidden` : `M-hide`}>User Profile</p>
            </li>
          </Link>
          {/* <Link to="/admin/setting/shop">
            <li
              onClick={() => handleActive("/admin/setting/shop")}
              className={`hover:bg-[#c0fb86] hover:shadow-md transition-all duration-200 hover:text-[#3b7b68] mb-3 px-4 py-2 text-xl font-[500] ${
                currentPath === "/admin/setting/shop"
                  ? "bg-[#c0fb86] shadow-md text-[#3b7b68] "
                  : "text-white"
              } flex items-center gap-2 ${
                Thide ? "w-[100%] mt-3" : "w-72"
              } rounded-full cursor-pointer shop`}
            >
              <Tooltip
                target=".shop"
                content="Shop"
                position="right"
                event=""
              />
              <CiShop />
              <p className={Thide ? `hidden` : `M-hide`}>Shops</p>
            </li>
          </Link> */}
          <Link to="/admin/setting/Category">
            <li
              onClick={() => handleActive("/admin/setting/Category")}
              className={`hover:bg-[#c0fb86] hover:shadow-md transition-all duration-200 hover:text-[#3b7b68] mb-3 px-4 py-2 text-xl font-[500] ${
                currentPath === "/admin/setting/Category"
                  ? "bg-[#c0fb86] shadow-md text-[#3b7b68] "
                  : "text-white"
              } flex items-center gap-2 ${
                Thide ? "w-[100%] mt-3" : "w-72"
              } rounded-full cursor-pointer category`}
            >
              <Tooltip
                target=".category"
                content="Category"
                position="right"
                event=""
              />
              <BiSolidCategory />
              <p className={Thide ? `hidden` : `M-hide`}>Category</p>
            </li>
          </Link>
          <Link to="/admin/setting/subCategory">
            <li
              onClick={() => handleActive("/admin/setting/subCategory")}
              className={`hover:bg-[#c0fb86] hover:shadow-md transition-all duration-200 hover:text-[#3b7b68] mb-3 px-4 py-2 text-xl font-[500] ${
                currentPath === "/admin/setting/subCategory"
                  ? "bg-[#c0fb86] shadow-md text-[#3b7b68] "
                  : "text-white"
              } flex items-center gap-2 ${
                Thide ? "w-[100%] mt-3" : "w-72"
              } rounded-full cursor-pointer subCategory`}
            >
              <Tooltip
                target=".subCategory"
                content="Sub Category"
                position="right"
                event=""
              />
              <MdCategory />
              <p className={Thide ? `hidden` : `M-hide`}>Brand Name</p>
            </li>
          </Link>
          {/* <Link to="/admin/setting/ml">
            <li
              onClick={() => handleActive("/admin/setting/ml")}
              className={`hover:bg-[#c0fb86] hover:shadow-md transition-all duration-200 hover:text-[#3b7b68] mb-3 py-2 text-xl px-4 font-[500] ${
                currentPath === "/admin/setting/ml"
                  ? "bg-[#c0fb86] shadow-md text-[#3b7b68]"
                  : "text-white"
              } flex items-center gap-2 ${
                Thide ? "w-[100%] mt-3" : "w-72"
              } rounded-full cursor-pointer ml`}
            >
              <Tooltip
                target=".ml"
                content="Milli liter"
                position="right"
                event=""
              />
              <AiTwotoneBuild />
              <p className={Thide ? `hidden` : `M-hide`}>Milli liter</p>
            </li>
          </Link> */}
        </ul>
        {/* <div className="border border-black overflow-hidden"> */}
        <ul className=" overflow-hidden">
          <div className="absolute bottom-20">
            <li
              className={`border border-[#c0fb86] hover:text-[#c0fb86] hover:bg-transparent transition-all duration-200 py-2 text-xl font-[500] 
                bg-[#c0fb86] shadow-md text-[#3b7b68]
             flex items-center gap-2 ${
               Thide ? "w-[100%] mt-3 px-3" : "min-w-[110%] px-5"
             } rounded-full cursor-pointer loguot`}
              onClick={LogOut}
            >
              <Tooltip
                target=".loguot"
                content="Log Out"
                position="right"
                event=""
              />
              <CiLogout />
              <p className={Thide ? `hidden` : `M-hide`}>Log Out</p>
            </li>
          </div>
        </ul>
      </div>
      {/* </div> */}
      <Toast ref={toast} />
    </div>
  );
};

export default Sidebar;
