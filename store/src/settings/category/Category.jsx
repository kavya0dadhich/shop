import { AiFillEdit, Column, DataTable, FaEye, FilterMatchMode, Link, Spinner,  useEffect,  useState } from '../../share/dependencies'


function Category() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });


  useEffect(() => {
    fetch("http://localhost:3000/categoryList")
      .then((res) => res.json())
      .then((data) => {
        if (data.result) setCategory(data.result);
        setLoading(false)
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

  const editItem = (rowData) => {
    console.log(`Editing item: ${rowData.SalesName}`);
  };
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
 scrollHeight="620px"             >
              <Column
                field="categoryName"
                header="Category Name"
                sortable
                // style={{ width: "25%" }}
              ></Column>
              <Column
                field="categoryDescription"
                header="Description"
                sortable
              ></Column>
              <Column
                // style={{ width: "25%" }}
                header="Action"
                body={(rowData) => (
                  <>
                    <div className="flex gap-5 text-[20px] text-black ">
                    {/* className="hover:-translate-y-1 cursor-pointer transition-all" */}
                      <FaEye onClick={() => editItem(rowData)} className="cursor-pointer "/>
                      <AiFillEdit onClick={() => editItem(rowData)} className="cursor-pointer "/>
                    </div>
                  </>
                )}
              />
            </DataTable>
          </div>
          {loading && <Spinner />}
    </>
  );
}

export default Category;
