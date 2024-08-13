import {
  AiFillEdit,
  BreadCrumb,
  Column,
  DataTable,
  FaEye,
  Link,
  Spinner,
  useEffect,
  useState,
} from "../share/dependencies";

function Sales() {
  const items = [{ label: "Sales", url: "/admin/sales" }];
  const home = { icon: "bi bi-house", url: "/admin" };
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:3000/salesList")
      .then((res) => res.json())
      .then((data) => {
        if (data.result) setTableData(data.result);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const editItem = (rowData) => {
    console.log(`Editing item: ${rowData}`);
  };
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
  return (
    <>
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
            selectionMode="single"
            rowsPerPageOptions={[5, 10, 25, 50]}
            scrollHeight="620px"
          >
            <Column field="date" header="Date" sortable></Column>
            <Column field="typeOfSale" header="Type Of Sales" sortable></Column>
            <Column
              field="quantity"
              header="Quntity"
              sortable
              body={colorSetBlue}
            ></Column>
            <Column
              field="salesQuntity"
              header="Sales Quntity"
              sortable
              body={colorSetRed}
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
      </div>
    </>
  );
}

export default Sales;
