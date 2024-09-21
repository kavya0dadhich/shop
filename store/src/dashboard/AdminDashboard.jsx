import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import Navebar from "../components/Navebar";
import { useState } from "react";
// import { SlLogout } from "react-icons/sl";
// import Purchase from "../purchase/Purchase";

function AdminDashboard() {
  const [dataFromChild, setDataFromChild] = useState(true);
  const [dataFromChildNav, setDataFromChildNav] = useState(true);

  const handleDataFromChild = (data) => {
    setDataFromChild(data);
  };
  const handleDataFromChildNav = (data) => {
    setDataFromChildNav(data);
  };
  console.log(dataFromChildNav);
  return (
    <div className="h-[100vh] bg-[#88bdbc]/30">
      <div className="flex h-full">
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full max-[1318px]:z-20 max-[1318px]:w-[20rem] ${
            dataFromChildNav
              ? "max-[1318px]:-translate-x-[100%]"
              : "max-[1318px]:translate-x-[0%]"
          } transition-all duration-500 ease-in-out ${
            dataFromChild ? "w-[20%]" : "w-[7.5%]"
          }`}
        >
          <div className="h-full p-6 " onClick={() => setDataFromChildNav(true)}>
            <Sidebar onDataSend={handleDataFromChild} />
          </div>
        </div>

        {/* Overlay for small screens */}
        {dataFromChildNav ? null : (
          <div
            className="fixed top-0 left-0 w-full h-full bg-slate-500/50 z-10"
            onClick={() => setDataFromChildNav(true)}
          ></div>
        )}

        {/* Main Content */}
        <div
          className={`ml-auto max-[1318px]:w-[100%] transition-all duration-500 ${
            dataFromChild ? "w-[80%]" : "w-[91.5%]"
          }`}
        >
          <Navebar handleDataFromChildNav={handleDataFromChildNav} />
            <Outlet />
          </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
