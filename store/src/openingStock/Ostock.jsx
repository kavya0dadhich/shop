import Column from "antd/es/table/Column";
import {
  BreadCrumb,
  ConfirmDialog,
  DataTable,
  FilterMatchMode,
  Link,
  Spinner,
  Toast,
  useEffect,
  useRef,
  useState,
} from "../share/dependencies";
import { OstockListApi } from "../components/apiCall";

function Ostock() {
  const toast = useRef(null);
  const items = [{ label: "Opening Stock", url: "/admin/O-stock" }];
  const home = { icon: "bi bi-house", url: "/admin" };
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const oStockAPI = async () => {
    const result = await OstockListApi();
    console.log(result);
    setTableData(result);
    setLoading(false);
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
  useEffect(() => {
    oStockAPI();
  }, []);
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
                Opening Stock List
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
            <Link to={"/admin/O-stock/Add-Ostock"}>
              <div className="px-3 py-2 text-lg font-semibold cursor-pointer rounded-md active:scale-[0.9000] shadow-md max-[428px]:mb-3 bg-[#ccf6d9] max-[428px]:w-[100%]">
                + Add Opening Stock
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
            scrollHeight="580px"
          >
            <Column
              field="category.categoryName"
              header="Category Name"
              sortable
              body={stockBodyTemplate}
              // style={{ width: "25%" }}
            ></Column>
            <Column
              field="brandName.name"
              header="Brand Name"
              sortable
              // style={{ width: "25%" }}
            ></Column>
            <Column
              field="brandName.Type"
              header="Brand Type"
              sortable
              // style={{ width: "25%" }}
            ></Column>
            <Column
              field="quantity"
              header="Quantity"
              sortable
              body={colorSet}
            ></Column>
            {/* <Column
                  field="quantity"
                  header="Quantity"
                  sortable
                  body={colorSet}
                  footer={
                    <div className="bg-green-700 text-white text-center w-20 p-1 rounded-lg">
                      {totalQuantity}
                    </div>
                  } // Add footer for total quantity
                  // style={{ width: "25%" }}
                ></Column>
                <Column
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
            {/* <Column
                  header="Action"
                  body={(rowData) => (
                    <>
                      <div className="flex gap-5 text-[20px] text-black ">
                      
                        <FaEye
                          onClick={() => viewItem(rowData)}
                          className="cursor-pointer "
                        />
                        
                        <MdDelete
                          onClick={() => confirm2(rowData)}
                          className="cursor-pointer"
                        />
                      </div>
                    </>
                  )}
                /> */}
          </DataTable>
        </div>
      </div>
      {loading && <Spinner />}
      <Toast ref={toast} />
    </>
  );
}

export default Ostock;
