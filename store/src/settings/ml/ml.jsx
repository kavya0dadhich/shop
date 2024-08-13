import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Link } from "react-router-dom";
import { FilterMatchMode } from "primereact/api";
import { Spinner } from "../../components/spinner";


function ML() {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [ml, setMl] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/ML_List")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        setMl(data.result)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const editItem = (rowData) => {
    console.log(`Editing item: ${rowData}`);
  };
  return (
    <>
          <div className="p-5 bg-[#163832] rounded-md">
            <div className="flex justify-between items-center mb-2 flex-wrap">
              <div className="flex w-[40%]">
                {" "}
                <p className="text-2xl max-[428px]:w-[100%] max-[428px]:mb-3 text-white font-semibold w-full">
              ML List
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
              <Link to={"/admin/setting/add-ml"}>
                <div className="px-3 py-2 text-lg font-semibold cursor-pointer rounded-md active:scale-[0.9000] shadow-md max-[428px]:mb-3 bg-[#ccf6d9] max-[428px]:w-[100%]">
                  + Add ML
                </div>
              </Link>
            </div>
            <DataTable
              className="mt-3"
              value={ml}
              tableStyle={{ minWidth: "50rem" }}
              paginator
              filters={filter}
              rows={10}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              scrollHeight="620px" 
            >
              <Column
                field="ml"
                header="ML"
                sortableq
              ></Column>
              <Column
                field="description"
                header="Description"
                sortable
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
          {loading && <Spinner />}
    </>
  );
}

export default ML;