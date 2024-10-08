import { SubCategorieslist } from "../../components/apiCall";
import {
  BreadCrumb,
  Column,
  confirmDialog,
  ConfirmDialog,
  DataTable,
  FilterMatchMode,
  Link,
  MdDelete,
  Spinner,
  Toast,
  useEffect,
  useRef,
  useState,
} from "../../share/dependencies";

function SubCategory() {
  const items = [{ label: "Brand", url: "/admin/setting/subCategory" }];
  const home = { icon: "bi bi-house", url: "/admin" };
  const [loading, setLoading] = useState(true);
  const toast = useRef(null);
  const [filter, setFilter] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [subCategories, setSubCategories] = useState([]);
  useEffect(() => {
    subCategoryAIPData();
  }, []);
  const subCategoryAIPData = async () => {
    const result = await SubCategorieslist();
    if (result instanceof Error) console.log("API feach to fail data");
    setLoading(false);
    console.log(result);
    setSubCategories(result);
  };
  const deleteItem = (rowData) => {
    console.log(rowData._id);
    setLoading(true);
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };
    fetch(
      `http://localhost:3000/subCategoriesDelete/${rowData._id}`,
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
          setLoading(false);
          subCategoryAIPData();
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
  // eslint-disable-next-line no-undef
  // const editItem = (rowData) => {
  //   console.log(`Editing item: ${rowData}`);
  // };
  return (
    <>
      <ConfirmDialog />
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
                Brand List
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
            <Link to={"/admin/setting/add-subCategory"}>
              <div className="px-3 py-2 text-lg font-semibold cursor-pointer rounded-md active:scale-[0.9000] shadow-md max-[428px]:mb-3 bg-[#ccf6d9] max-[428px]:w-[100%]">
                + Add Brand
              </div>
            </Link>
          </div>
          <DataTable
            className="mt-3"
            value={subCategories}
            tableStyle={{ minWidth: "50rem" }}
            paginator
            filters={filter}
            rows={10}
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            scrollHeight="580px"
          >
            <Column field="name" header="Category Name" sortable></Column>
            <Column field="Type" header="Type" sortable></Column>
            <Column
              field="brandQuantity"
              header="Brand Quantity"
              sortable
            ></Column>
            <Column
              field="subCategoryDescription"
              header="Description"
              sortable
            ></Column>
            <Column
              header="Action"
              body={(rowData) => (
                <>
                  {console.log(rowData)}
                  <div className="flex gap-5 text-[20px] text-black ">
                    {/* className="hover:-translate-y-1 cursor-pointer transition-all" */}
                    {/* <FaEye
                        // onClick={() => editItem(rowData)}
                        className="cursor-pointer "
                      /> */}
                    <MdDelete
                      onClick={() => confirm2(rowData)}
                      className="cursor-pointer "
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

export default SubCategory;
