import { ProductLApi } from "../components/apiCall";
import {
  AiFillEdit,
  BreadCrumb,
  Column,
  confirmDialog,
  ConfirmDialog,
  DataTable,
  Dialog,
  FaEye,
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
  const [viewData, setViewData] = useState(true);
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);
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
  const editItem = (rowData) => {
    console.log(`Editing item: ${rowData.SalesName}`);
  };
  const deleteItem = (rowData) => {
    console.log(rowData._id);
    setLoading(true);
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
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
  const renderDueQuantity = (rowData) => {
    console.log(rowData);
    return (
      <>
        {rowData.dueQuantity == rowData.quantity ? null : (
          <div className="bg-red-700 text-white text-center w-20 p-1 rounded-lg">
            {rowData.dueQuantity}{" "}
          </div>
        )}
      </>
    );
  };

  const viewItem = (rowData) => {
    setVisible(true);
    setViewData(rowData);
    console.log(rowData);
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
            rows={5}
            filters={filter}
            rowsPerPageOptions={[5, 10, 25, 50]}
            scrollHeight="620px"
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
            ></Column>
            <Column
              field="subCategories.name"
              header="Sub Categories"
              sortable
            ></Column>
            <Column field="ml.ml" header="ML" sortable></Column>
            <Column
              field="quantity"
              header="Quantity"
              sortable
              body={colorSet}
              // style={{ width: "25%" }}
            ></Column>
            <Column
              field="dueQuantity"
              header="Due Quantity"
              sortable
              body={renderDueQuantity}
              // style={{ width: "25%" }}
            ></Column>
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
      <Dialog
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
              <div><span className="font-bold">Date:-</span> {viewData?.date}</div>
              <div><span className="font-bold"> Category:- </span>{viewData?.category?.categoryName}</div>
              <div><span className="font-bold"> Sub Categories:- </span>{viewData?.subCategories?.name}</div>
              <div><span className="font-bold"> Category:-</span> {viewData?.category?.categoryName}</div>
            </div>
            <div className="p-2">
              <div><span className="font-bold"> Quantity:- </span>{viewData?.quantity}</div>
              <div><span className="font-bold"> Due Quantity:- </span>{viewData?.dueQuantity}</div>
              <div><span className="font-bold"> ml:- </span>{viewData?.ml?.ml}</div>
              <div><span className="font-bold"> Address:- </span>{viewData?.address}</div>
            </div>
            </div>
          </div>
        </p>
      </Dialog>
    </>
  );
}

export default Purchase;
