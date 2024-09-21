// import { Link, useNavigate } from "react-router-dom";
// import { MdOutlineWork } from "react-icons/md";
// import { IoMdSettings } from "react-icons/io";
import { useState, useRef, useEffect, useContext } from "react";
import { CiMenuFries } from "react-icons/ci";
// import { CiLogout } from "react-icons/ci";
import { IoMdSearch } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
// import { IoNotificationsOutline } from "react-icons/io5";
// import { TfiAlignRight } from "react-icons/tfi";
import eventEmitter from "../components/eventEmitter";
import { MyContext } from "./Myprovider";

// eslint-disable-next-line react/prop-types
function Navebar({ handleDataFromChildNav }) {
  const sendData = () => {
    eventEmitter.emit("dataChanged", "Data from A");
  };
  useEffect(() => {
    sendData();
  }, []);
  const { data } = useContext(MyContext);
  console.log(data);
  const [UserData, setUserData] = useState(false);
  // const navigate = useNavigate();
  const inputRef = useRef();
  const [toogHide, setToogHide] = useState(false);
  // const toggleDropdown = () => {
  //   setHide(!hide);
  // };
  // function LogOut() {
  //   navigate("/");
  // }
  const focusGet = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // Set focus on the input
    }
  };
  const Nhide = () => {
    setToogHide(!toogHide);
    sendDataToParent();
  };
  const sendDataToParent = () => {
    handleDataFromChildNav(toogHide);
  };
  useEffect(() => {
    if (data) {
      setUserData(data);
    }
  }, [data]);

  return (
    <>
      <nav className=" w-full flex p-5">
        <div className="flex justify-between max-[904px]:flex-wrap w-full items-center">
          <ul className="flex gap-6 justify-between w-80 items-center max-[903px]:w-full max-[903px]:mt-5">
            <li className="max-[1318px]:block hidden text-3xl mt-1">
              <Link to={"/admin"} className="logo text-black">
                lOGO
              </Link>
            </li>
            <li className="w-full relative max-[320px]:hidden">
              <input
                className="w-full p-3 rounded-md outline-none border-none bg-zinc-200 shadow-xl"
                placeholder="Search .."
                type="text"
                ref={inputRef}
                name=""
                id=""
              />
              <IoMdSearch
                onClick={focusGet}
                className="absolute top-2 right-2 text-zinc-700 cursor-pointer text-[31px]"
                title="Search"
              />
            </li>
            <li>
              <CiMenuFries
                className="max-[1318px]:block text-[30px] font-bold text-balck hidden cursor-pointer"
                onClick={Nhide}
              />
            </li>
            {/* <li className="relative text-black">
              {hide && (
                <div className="absolute w-28 p-2 bg-white top-7 shadow-xl max-[903px]:block rounded-md hidden dropdown max-[1071px]:right-5 right-24 z-10">
                  <ul>
                    <Link to={"/setting"}>
                      <li className="cursor-pointer mb-1">My Profile</li>
                    </Link>
                    <hr />
                    <Link to={"/login"}>
                      <li className="cursor-pointer">Log Out</li>
                    </Link>
                  </ul>
                </div>
              )}
            </li> */}
          </ul>
          <ul className="flex gap-5 items-center max-[903px]:hidden">
            {/* <li>
              <CiLogout className="text-3xl cursor-pointer" onClick={LogOut} />
            </li> */}
            <li>
              <IoNotificationsOutline className="text-3xl cursor-pointer" />
            </li>
            <li className="">
              <div className="w-12 rounded-full h-12 bg-black overflow-hidden object-cover object-center">
                <Link to={"/admin/setting"}>
                  {" "}
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiGSOXM7ck96MBiHMlDUg9lkkLDyJ_6Wsix26Q8ZmKVTWTYJcOY_L7_acMHQ_mbAFJCk4&usqp=CAU"
                    alt=""
                  />
                </Link>
              </div>
            </li>
            <li className="text-end cursor-pointer ">
              <p className="font-bold tracking-[3px]">
                {UserData.firstName} {UserData.lastName}
              </p>
              <p>Admin</p>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navebar;
