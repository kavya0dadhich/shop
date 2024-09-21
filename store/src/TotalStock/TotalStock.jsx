import { TotalStockListApi } from "../components/apiCall";
import {
  BreadCrumb,
  Column,
  DataTable,
  FilterMatchMode,
  //   Link,
  //   MdDelete,
  Spinner,
  Toast,
  useEffect,
  useRef,
  useState,
} from "../share/dependencies";
function TotalStock() {
  const items = [{ label: "Total Stock", url: "/admin/total-stock" }];
  const home = { icon: "bi bi-house", url: "/admin" };
  const [loading, setLoading] = useState(true);
  const [totalStockData, setTotalStockData] = useState();
  const toast = useRef(null);
  const [filter, setFilter] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const totalStockList = async () => {
    const result = await TotalStockListApi();
    setLoading(false);
    setTotalStockData(result);
    console.log(result);
  };
  useEffect(() => {
    totalStockList();
  }, []);
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

  const colorSet = (rowData) => { 
    return (
      <>
        <div className="bg-green-700 text-white text-center w-20 p-1 rounded-lg">
          {rowData.brandQuantity}
        </div>
      </>
    );
  };
  const colorSetdue = (rowData) => { 
    return (
      <>
        <div className="bg-red-700 text-white text-center w-20 p-1 rounded-lg">
          {rowData.dueBrandQuantity}
        </div>
      </>
    );
  };

  return (
    <>
      <div className="p-5">
        <BreadCrumb model={items} home={home} className="my-5 w-72" />
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
                Total Stock List
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
            {/* <Link to={"/admin/setting/add-subCategory"}>
              <div className="px-3 py-2 text-lg font-semibold cursor-pointer rounded-md active:scale-[0.9000] shadow-md max-[428px]:mb-3 bg-[#ccf6d9] max-[428px]:w-[100%]">
                + Add Brand
              </div>
            </Link> */}
          </div>
          <DataTable
            className="mt-3"
            value={totalStockData}
            tableStyle={{ minWidth: "50rem" }}
            paginator
            filters={filter}
            // showGridlines
            // stripedRows
            rows={10}
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            scrollHeight="580px"
          >
            <Column field="invoice" header="Invoice" sortable></Column>
            <Column
              field="category.categoryName"
              body={stockBodyTemplate}
              header="Category"
              sortable
            ></Column>
            <Column
              field="brandName.name"
              header="Brand Name"
              sortable
            ></Column>
            <Column
              field="brandName.Type"
              header="Brand Type"
              sortable
            ></Column>
            <Column
              field="brandQuantity"
              header="Total Brand Quantity"
              sortable
              body={colorSet}
            ></Column>
            <Column
              field="dueBrandQuantity"
              header="Total Brand Due Quantity"
              sortable
              body={colorSetdue}
            ></Column>
            {/* <Column
              header="Action"
              body={(rowData) => (
                <>
                  {console.log(rowData)}
                  <div className="flex gap-5 text-[20px] text-black ">
                    className="hover:-translate-y-1 cursor-pointer transition-all"
                    <FaEye
                        // onClick={() => editItem(rowData)}
                        className="cursor-pointer "
                      />
                    <MdDelete
                      onClick={() => confirm2(rowData)}
                      className="cursor-pointer "
                    />
                  </div>
                </>
              )}
            /> */}
          </DataTable>
        </div>
        {loading && <Spinner />}
        <Toast ref={toast} />
      </div>
    </>
  );
}

export default TotalStock;
