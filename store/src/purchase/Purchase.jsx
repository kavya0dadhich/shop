import { ProductLApi } from "../components/apiCall";
import {
  BreadCrumb,
  Column,
  confirmDialog,
  ConfirmDialog,
  DataTable,
  // Dialog,
  // FaEye,
  FilterMatchMode,
  Link,
  MdDelete,
  Spinner,
  Toast,
  useEffect,
  useRef,
  useState,
} from "../share/dependencies";

function Purchase() {
  const items = [{ label: "Purchase", url: "/admin/purchase" }];
  const home = { icon: "bi bi-house", url: "/admin" };
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [viewData, setViewData] = useState(true);
  const toast = useRef(null);
  // const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  useEffect(() => {
    fatchProductData();
  }, []);
  const fatchProductData = async () => {
    const result = await ProductLApi();
    if (result instanceof Error) console.log("API data fail to fatch");
    setLoading(false);
    setTableData(result);
  };

  console.log(tableData);
  // const editItem = (rowData) => {
  //   console.log(`Editing item: ${rowData.SalesName}`);
  // };
  const deleteItem = (rowData) => {
    console.log(rowData._id);
    setLoading(true);
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };
    fetch(
      `http://localhost:3000/productDeleteById/${rowData._id}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == "success") {
          toast.current.show({
            severity: "success",
            life: 3000,
            summary: "Success",
            detail: data.message,
          });
          fatchProductData();
          setLoading(false);
        } else {
          toast.current.show({
            severity: "error",
            life: 3000,
            summary: "Error",
            detail: data.message,
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
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
      // eslint-disable-next-line no-dupe-keys
      rejectClassName: "custom-reject-button",
      // eslint-disable-next-line no-dupe-keys
      acceptClassName: "custom-accept-button",
    });
  };
  // const renderDueQuantity = (rowData) => {
  //   return (
  //     <>
  //       {/* {rowData.dueQuantity == rowData.quantity ? null : ( */}
  //       <div className="bg-red-700 text-white text-center w-20 p-1 rounded-lg">
  //         {rowData.dueQuantity}{" "}
  //       </div>
  //       {/* )} */}
  //     </>
  //   );
  // };

  // const viewItem = (rowData) => {
  //   setVisible(true);
  //   setViewData(rowData);
  // };
  const colorSet = (rowData) => {
    if (!rowData || !rowData.brandName) {
      return null;
    }
    return (
      <>
        <div className="bg-green-700 text-white text-center w-20 p-1 rounded-lg">
          {rowData.brandName.brandQuantity}
        </div>
      </>
    );
  };

  const stockBodyTemplate = (rowData) => {
    console.log(rowData.category.categoryName);
    return (
      <div
        className={`${
          rowData.category.categoryName === "Q"
            ? "bg-red-100 text-red-900"
            : rowData.category.categoryName === "P"
            ? "bg-blue-100 text-blue-900"
            : rowData.category.categoryName === "N"
            ? "bg-teal-100 text-teal-900"
            : "bg-gray-100 text-gray-900" // Fallback if none of the conditions match
        } rounded-full w-[2rem] h-[2rem] inline-flex font-bold justify-center items-center text-sm`}
      >
        {rowData.category.categoryName}
      </div>
    );
  };

  console.log(tableData);
  const filterHandle = (event) => {
    // Example: assuming the event parameter provides 'filters' and 'filteredValue'
    const { filters, filteredValue } = event;
    console.log("filters", filters);
    console.log("filteredValue", filteredValue);
    // Update your filters state
  };
  const totalQuantity = tableData
    ? tableData.reduce(
        (total, ele) =>
          total + ((ele.brandName && ele.brandName.brandQuantity) || 0),
        0
      )
    : 0;

  // const totalDueQuantity = tableData
  //   ? tableData.reduce((total, ele) => total + (ele.dueQuantity || 0), 0)
  //   : 0;

  // Footer text
  // const footer = `In total, there are ${totalQuantity} products, with ${totalDueQuantity} due.`;
  return (
    <>
      <ConfirmDialog />
      <div className="p-5">
        <BreadCrumb model={items} home={home} className="my-5 w-72" />
        <div className="p-5 bg-[#163832] rounded-md">
          <div className="flex justify-between items-center mb-2 flex-wrap">
            <div className="flex w-[40%]">
              {" "}
              <p className="text-2xl max-[428px]:w-[100%] max-[428px]:mb-3 text-white font-semibold w-full">
                Purchase List
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
            <Link to={"/admin/purchase/Add-purchase"}>
              <div className="px-3 py-2 text-lg font-semibold cursor-pointer rounded-md active:scale-[0.9000] shadow-md max-[428px]:mb-3 bg-[#ccf6d9] max-[428px]:w-[100%]">
                + Add Purchase
              </div>
            </Link>
          </div>
          <DataTable
            className="mt-3"
            value={tableData}
            tableStyle={{ minWidth: "50rem" }}
            paginator
            onFilter={filterHandle}
            rows={5}
            filters={filter}
            rowsPerPageOptions={[5, 10, 25, 50]}
            scrollHeight="580px"
          >
            <Column
              field="invoice"
              header="Invoice Number"
              sortable
              // style={{ width: "25%" }}
            ></Column>
            <Column
              field="date"
              header="Date"
              sortable
              // style={{ width: "25%" }}
            ></Column>
            <Column
              field="category.categoryName"
              header="Category"
              sortable
              body={stockBodyTemplate}
            ></Column>
            <Column
              field="brandName.name"
              header="Brand Name"
              sortable
            ></Column>
            <Column
              field="brandName.Type"
              header="Brand Name Type"
              footer={<div className="font-bold text-xl">Total</div>}
              sortable
            ></Column>
            <Column
              field="brandName.brandQuantity"
              header="Brand Quantity"
              sortable
              body={colorSet}
              footer={
                <div className="bg-green-700 text-white text-center w-20 p-1 rounded-lg">
                  {totalQuantity}
                </div>
              } // Add footer for total quantity
              // style={{ width: "25%" }}
            ></Column>
            {/* <Column
              field="dueQuantity"
              header="Due Quantity"
              sortable
              body={renderDueQuantity}
              footer={
                // totalQuantity === totalDueQuantity ? null : (
                  <div className="bg-red-700 text-white text-center w-20 p-1 rounded-lg">
                    {totalDueQuantity}
                  </div>
                // )
              } // Add footer for total due quantity
              // style={{ width: "25%" }}
            ></Column> */}
            <Column
              header="Action"
              body={(rowData) => (
                <>
                  <div className="flex gap-5 text-[20px] text-black ">
                    {/* className="hover:-translate-y-1 cursor-pointer transition-all" */}
                    {/* <FaEye
                      onClick={() => viewItem(rowData)}
                      className="cursor-pointer "
                    /> */}
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
      </div>
      {loading && <Spinner />}
      <Toast ref={toast} />
      {/* <Dialog
        header="Purchase Details"
        visible={visible}
        style={{ width: "30vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <p className="m-0">
          <div>
            <h2 className="text-[22px] font-bold text-blue-700">
              Invoice:- {viewData?.invoice}
            </h2>
            <div className="flex gap-7">
              <div className="p-3">
                <div>
                  <span className="font-bold">Date:-</span> {viewData?.date}
                </div>
                <div>
                  <span className="font-bold"> Category:- </span>
                  {viewData?.category?.categoryName}
                </div>
                <div>
                  <span className="font-bold"> Sub Categories:- </span>
                  {viewData?.subCategories?.name}
                </div>
                <div>
                  <span className="font-bold"> Category:-</span>{" "}
                  {viewData?.category?.categoryName}
                </div>
              </div>
              <div className="p-2">
                <div>
                  <span className="font-bold"> Quantity:- </span>
                  {viewData?.quantity}
                </div>
                <div>
                  <span className="font-bold"> Due Quantity:- </span>
                  {viewData?.dueQuantity}
                </div>
                <div>
                  <span className="font-bold"> ml:- </span>
                  {viewData?.ml?.ml}
                </div>
                <div>
                  <span className="font-bold"> Address:- </span>
                  {viewData?.address}
                </div>
              </div>
            </div>
          </div>
        </p>
      </Dialog> */}
    </>
  );
}

export default Purchase;
