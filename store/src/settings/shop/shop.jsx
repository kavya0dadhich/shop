import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Link } from "react-router-dom";
import { FilterMatchMode } from "primereact/api";
import { Dialog } from "primereact/dialog";
import { Spinner } from "../../components/spinner";

function Shop() {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [shop, setShop] = useState([]);
  const [visible, setVisible] = useState(false);
  const [dialogData, setDialogData] = useState();
  useEffect(() => {
    fetch("http://localhost:3000/shopList")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        setShop(data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const editItem = (rowData) => {
    console.log(`Editing item: ${rowData}`);
  };
  const viewItem = (rowData) => {
    console.log(`Editing item: `, rowData);
    setDialogData(rowData);
    setVisible(true);
  };
  const colorSetBlue = (rowData) => {
    console.log(rowData);
    return (
      <>
        <div className="bg-blue-700 text-white text-center w-20 p-1 rounded-lg">
          {rowData.quantity}
        </div>
      </>
    );
  };
  const colorSetRed = (rowData) => {
    console.log(rowData);
    return (
      <>
        <div className="bg-red-700 text-white text-center w-20 p-1 rounded-lg">
          {rowData.dueQuntity}
        </div>
      </>
    );
  };
  // const setProductdetails = (rowData) => {
  //   if(rowData.product){
  //     console.log(rowData);
  //     return (<>
  //       <div>{rowData.product.category.categoryName},{rowData.product.subCategories.name},{rowData.product.ml.ml}</div>
  //     </>)
  //   }else{
  //     return(<>
  //       <div>No Products !</div>
  //     </>)
  //   }
  // }
  return (
    <>
      <div className="p-5 bg-[#163832] rounded-md">
        <div className="flex justify-between items-center mb-2 flex-wrap">
          {/* <div>
                {" "}
                <h1 className="text-2xl max-[428px]:w-[100%] max-[428px]:mb-3 text-white">
                </h1>
                </div> */}
          <div className="flex w-[40%]">
            {" "}
            <p className="text-2xl max-[428px]:w-[100%] max-[428px]:mb-3 text-white font-semibold w-full">
              Shop List
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
          <Link to={"/admin/setting/add-shop"}>
            <div className="px-3 py-2 text-lg font-semibold cursor-pointer rounded-md active:scale-[0.9000] shadow-md max-[428px]:mb-3 bg-[#ccf6d9] max-[428px]:w-[100%]">
              + Add Shop
            </div>
          </Link>
        </div>
        <DataTable
          className="mt-3"
          value={shop}
          tableStyle={{ minWidth: "50rem" }}
          paginator
          filters={filter}
          rows={10}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          scrollHeight="620px"
        >
          <Column field="shopName" header="Shop Name" sortable></Column>
          {/* <Column field="product" header="Product details" sortable body={(rowData) => setProductdetails(rowData)}></Column> */}
          <Column
            field="quantity"
            header="Quantity"
            sortable
            body={colorSetBlue}
          ></Column>
          <Column
            field="dueQuntity"
            header="Due Quntity"
            body={colorSetRed}
            sortable
          ></Column>
          <Column field="address" header="address" sortable></Column>
          <Column
            header="Action"
            body={(rowData) => (
              <>
                <div className="flex gap-5 text-[20px] text-black ">
                  {/* className="hover:-translate-y-1 cursor-pointer transition-all" */}
                  <FaEye
                    onClick={() => viewItem(rowData)}
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
      <Dialog
        header={dialogData?.shopName}
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <div className="flex justify-between mt-3">
          <div className="">Data : - {dialogData?.date}</div>
          <div className="">
            Quntity:-{" "}
            <span className="bg-green-500 text-white p-2 rounded-xl">
              {dialogData?.quantity}
            </span>{" "}
            Due Quntity:-{" "}
            <span className="bg-red-500 text-white p-2 rounded-xl">
              {dialogData?.dueQuntity}
            </span>
          </div>
        </div>
        <div className="mt-8">
          <DataTable
            className="mt-3"
            value={dialogData?.product}
            tableStyle={{ minWidth: "50rem" }}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            scrollHeight="620px"
          >
            <Column
              field="category.categoryName"
              header="Category Name"
              sortable
            ></Column>
            <Column
              field="subCategories.name"
              header="Sub Categories Name"
              sortable
            ></Column>
            <Column
              field="ml.ml"
              header="ML"
              sortable
            ></Column>
            <Column
              field="shopQuntity"
              header="Shop Quntity"
              sortable
            ></Column>
          </DataTable>
        </div>
      </Dialog>
      {loading && <Spinner />}
    </>
  );
}

export default Shop;
