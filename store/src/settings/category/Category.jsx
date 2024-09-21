import {
  // AiFillEdit,
  BreadCrumb,
  Column,
  DataTable,
  // FaEye,
  FilterMatchMode,
  Link,
  Spinner,
  useEffect,
  useState,
} from "../../share/dependencies";

function Category() {
  const items = [{ label: "Category", url: "/admin/setting/Category" }];
  const home = { icon: "bi bi-house", url: "/admin" };
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const stockBodyTemplate = (rowData) => {
    return (
      <div
        className={`${
          rowData.categoryName === "Q"
            ? "bg-red-100 text-red-900"
            : rowData.categoryName === "P"
            ? "bg-blue-100 text-blue-900"
            : rowData.categoryName === "N"
            ? "bg-teal-100 text-teal-900"
            : "bg-gray-100 text-gray-900" // Fallback if none of the conditions match
        } rounded-full w-[2rem] h-[2rem] inline-flex font-bold justify-center items-center text-sm`}
      >
        {rowData.categoryName}
      </div>
    );
  };

  useEffect(() => {
    fetch("http://localhost:3000/categoryList", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) setCategory(data.result);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    // fetch("http://localhost:3000/ML_List")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setMl(data.result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);

  // const editItem = (rowData) => {
  //   console.log(`Editing item: ${rowData.SalesName}`);
  // };
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
              Category List
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
          <Link to={"/admin/setting/add-Category"}>
            <div className="px-3 py-2 text-lg font-semibold cursor-pointer rounded-md active:scale-[0.9000] shadow-md max-[428px]:mb-3 bg-[#ccf6d9] max-[428px]:w-[100%]">
              + Add Category
            </div>
          </Link>
        </div>
        <DataTable
          className="mt-3"
          value={category}
          tableStyle={{ minWidth: "50rem" }}
          paginator
          rows={5}
          filters={filter}
          rowsPerPageOptions={[5, 10, 25, 50]}
          scrollHeight="580px"
        >
          <Column
            field="categoryName"
            header="Category Name"
            sortable
            body={stockBodyTemplate}
            // style={{ width: "25%" }}
          ></Column>
          <Column
            field="categoryDescription"
            header="Description"
            sortable
          ></Column>
          {/* <Column
            // style={{ width: "25%" }}
            header="Action"
            body={(rowData) => (
              <>
                <div className="flex gap-5 text-[20px] text-black ">
                  className="hover:-translate-y-1 cursor-pointer transition-all"
                  <FaEye
                    onClick={() => editItem(rowData)}
                    className="cursor-pointer "
                  />
                  <AiFillEdit
                    // onClick={() => editItem(rowData)}
                    className="cursor-pointer "
                  />
                </div>
              </>
            )}
          /> */}
        </DataTable>
      </div>
      {loading && <Spinner />}
      </div>
    </>
  );
}

export default Category;
