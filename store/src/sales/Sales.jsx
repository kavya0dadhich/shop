/* eslint-disable no-dupe-keys */
import {
  BreadCrumb,
  Column,
  ConfirmDialog,
  confirmDialog,
  DataTable,
  FaEye,
  Link,
  MdDelete,
  Spinner,
  Toast,
  useEffect,
  useRef,
  useState,
} from "../share/dependencies";

function Sales() {
  const items = [{ label: "Sales", url: "/admin/sales" }];
  const home = { icon: "bi bi-house", url: "/admin" };
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useRef(null);
  useEffect(() => {
    sailsList();
  }, []);
  function sailsList() {
    fetch("http://localhost:3000/salesList", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) setTableData(data.result);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // const editItem = (rowData) => {
  //   console.log(`Editing item: ${rowData}`);
  // };
  const setProductdetails = (rowData) => {
    console.log(rowData);
    // if (rowData.updatedProductAll) {
    //   return (
    //     <>
    //       <div>
    //         {rowData.updatedProductAll.category.categoryName},
    //         {rowData.updatedProductAll.subCategories.name},
    //         {rowData.updatedProductAll.ml.ml}
    //       </div>
    //     </>
    //   );
    // } else if (rowData.updatedShopAll) {
    //   return (
    //     <>
    //        <div>
    //         {rowData.updatedShopAll.product.category.categoryName},
    //         {rowData.updatedShopAll.product.subCategories.name},
    //         {rowData.updatedShopAll.product.ml.ml}
    //       </div>
    //     </>
    //   );
    // } else {
    //   return (
    //     <>
    //       <div>No Products !</div>
    //     </>
    //   );
    // }
  };
  const deleteItem = (rowData) => {
    console.log(rowData._id);
    setLoading(true);
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };
    fetch(`http://localhost:3000/salesDelete/${rowData._id}`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          toast.current.show({
            severity: "success",
            life: 3000,
            summary: "Success",
            detail: data.message,
          });
          sailsList();
        } else {
          toast.current.show({
            severity: "error",
            life: 3000,
            summary: "Error",
            detail: data.message,
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.current.show({
          severity: "error",
          life: 3000,
          summary: "Error",
          detail: "An unexpected error occurred.",
        });
        setLoading(false);
      });
  };
  const confirm2 = (rowData) => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: () => deleteItem(rowData),
      rejectClassName: "custom-reject-button",
      acceptClassName: "custom-accept-button",
    });
  };
  const colorSetBlue = (rowData) => {
    console.log(rowData);
    if (rowData.typeOfSale == "Product") {
      return (
        <>
          <div className="bg-green-700 text-white text-center w-20 p-1 rounded-lg">
            {rowData.quantity}
          </div>
        </>
      );
    }
    if (rowData.typeOfSale == "Shop") {
      return (
        <>
          <div className="bg-green-700 text-white text-center w-20 p-1 rounded-lg">
            {rowData.updatedShopAll.quantity}
          </div>
        </>
      );
    }
  };
  const colorSetRed = (rowData) => {
    console.log(rowData);
    return (
      <>
        <div className="bg-red-700 text-white text-center w-20 p-1 rounded-lg">
          {rowData.salesQuntity}
        </div>
      </>
    );
  };

  const totalSalesQ = tableData
    ? tableData.reduce((total, ele) => total + (ele.salesQuntity || 0), 0)
    : 0;
  return (
    <>
      <ConfirmDialog />
      <div className="p-5">
        <BreadCrumb model={items} home={home} className="my-5 w-52" />
        <div className="p-5 bg-[#163832] rounded-md">
          <div className="flex justify-between items-center mb-2 flex-wrap">
            <div>
              {" "}
              <h1 className="text-2xl max-[428px]:w-[100%] max-[428px]:mb-3 text-white font-semibold">
                Sales List
              </h1>
            </div>
            <Link to={"/admin/sales/Add-sales"}>
              <div className="px-3 py-2 text-lg font-semibold cursor-pointer rounded-md active:scale-[0.9000] shadow-md max-[428px]:mb-3 bg-[#ccf6d9] max-[428px]:w-[100%]">
                + Add Sales
              </div>
            </Link>
          </div>
          <DataTable
            className="mt-3"
            value={tableData}
            tableStyle={{ minWidth: "50rem" }}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            scrollHeight="580px"
          >
            <Column field="date" header="Date" sortable></Column>
            <Column field="typeOfSale" header="Type Of Sales" sortable></Column>
            <Column
              field="quantity"
              header="Quntity"
              sortable
              body={colorSetBlue}
              footer={<div className="font-bold">Total</div>}
            ></Column>
            <Column
              field="salesQuntity"
              header="Sales Quntity"
              sortable
              body={colorSetRed}
              footer={
                <div className="bg-red-700 text-white text-center w-20 p-1 rounded-lg">
                  {totalSalesQ}
                </div>
              }
            ></Column>
            <Column
              field="updatedProductAll"
              header="Product details"
              sortable
              body={(rowData) => setProductdetails(rowData)}
            ></Column>
            <Column
              header="Action"
              body={(rowData) => (
                <>
                  <div className="flex gap-5 text-[20px] text-black ">
                    <FaEye
                      // onClick={() => editItem(rowData)}
                      className="cursor-pointer "
                    />
                    {/* <AiFillEdit
                      onClick={() => editItem(rowData)}
                      className="cursor-pointer "
                    /> */}
                    <MdDelete
                      onClick={() => confirm2(rowData)}
                      className="cursor-pointer"
                    />
                  </div>
                </>
              )}
            />
          </DataTable>
        </div>
        {loading && <Spinner />}
        <Toast ref={toast} />
      </div>
    </>
  );
}

export default Sales;
