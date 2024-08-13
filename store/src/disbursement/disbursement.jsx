// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { useEffect, useState } from "react";
// import "../App.css";
// import { Link } from "react-router-dom";
// // import { Button } from "primereact/button";
// import { FaEye } from "react-icons/fa";
// import { AiFillEdit } from "react-icons/ai";
// import { FilterMatchMode } from "primereact/api";
// import { Spinner } from "../components/spinner";
import {
  AiFillEdit,
  BreadCrumb,
  Column,
  DataTable,
  FaEye,
  FilterMatchMode,
  Link,
  Spinner,
  Toast,
  useEffect,
  useRef,
  useState,
} from "../share/dependencies";

function Disbursement() {
  const items = [
    { label: "Purchase", url: "/admin/purchase" },
    { label: "Add Purchase" },
  ];
  const home = { icon: "bi bi-house", url: "/admin" };
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useRef(null);
  const [filter, setFilter] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  useEffect(() => {
    fetch("http://localhost:3000/dirspermentList")
      .then((res) => res.json())
      .then((data) => {
        if (!tableData.length) {
          setLoading(false);
          setTableData(data.result);
        }
        console.log(data);
      });
  }, []);

  // toast.current.show({
  //   severity: "success",
  //   life: 3000,
  //   summary: "Success",
  //   detail: "data.message",
  // });
  console.log(tableData);
  const editItem = (rowData) => {
    console.log(`Editing item: ${rowData.SalesName}`);
  };
  // const setColor = (rowData) => (
  //   <div className="text-red-400">{rowData.ml}ml</div>
  // );
  const mixIT = (rowData) => {
    const data = `${rowData.updatedProduct.category.categoryName},${rowData.updatedProduct.subCategories.name},${rowData.updatedProduct.ml.ml}`;
    return data;
  };
  const colorSet = (rowData) => {
    console.log(rowData);
    if (rowData.quantity) {
      return (
        <>
          <div className="bg-blue-700 text-white text-center w-20 p-1 rounded-lg">
            {rowData.quantity}
          </div>
        </>
      );
    }
  };
  return (
    <>
      <div className="p-5">
        <BreadCrumb model={items} home={home} className="my-5 w-72" />
        <div className="p-5 bg-[#163832] rounded-md">
          <div className="flex justify-between items-center mb-2 flex-wrap">
            <div className="flex w-[40%]">
              {" "}
              <p className="text-2xl max-[428px]:w-[100%] max-[428px]:mb-3 text-white font-semibold w-full">
                Disbursement List
              </p>
              <div className="w-full">
                <input
                  className="w-full p-2 shadow-sm rounded-md outline-none border-none"
                  placeholder="Search .."
                  type="text"
                  name=""
                  id=""
                  onChange={(e) => {
                    setFilter({
                      global: {
                        value: e.target.value,
                        matchMode: FilterMatchMode.CONTAINS,
                      },
                    });
                  }}
                />
              </div>
            </div>
            <Link to={"/admin/disbursement/Add-disbursement"}>
              <div className="px-3 py-2 text-lg font-semibold cursor-pointer rounded-md active:scale-[0.9000] shadow-md max-[428px]:mb-3 bg-[#ccf6d9] max-[428px]:w-[100%]">
                + Add Disbursement
              </div>
            </Link>
          </div>
          <DataTable
            className="mt-3"
            value={tableData}
            tableStyle={{ minWidth: "50rem" }}
            paginator
            rows={5}
            filters={filter}
            rowsPerPageOptions={[5, 10, 25, 50]}
            scrollHeight="620px"
          >
            <Column field="date" header="Date" sortable></Column>
            <Column
              field="dueQuantity"
              header="Due Quantity"
              sortable
              body={mixIT}
            ></Column>
            <Column
              field="updatedShop.shopName"
              header="Shop Name"
              sortable
            ></Column>
            <Column
              field="quantity"
              header="Quantity"
              sortable
              body={colorSet}
              // style={{ width: "25%" }}
            ></Column>

            <Column
              header="Action"
              body={(rowData) => (
                <>
                  <div className="flex gap-5 text-[20px] text-black ">
                    {/* className="hover:-translate-y-1 cursor-pointer transition-all" */}
                    <FaEye
                      onClick={() => editItem(rowData)}
                      className="cursor-pointer "
                    />
                    <AiFillEdit
                      onClick={() => editItem(rowData)}
                      className="cursor-pointer "
                    />
                  </div>
                </>
              )}
            />
          </DataTable>
        </div>
      </div>
      {loading && <Spinner />}
      <Toast ref={toast} />
    </>
  );
}

export default Disbursement;
