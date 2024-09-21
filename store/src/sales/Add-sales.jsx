import {
  BreadCrumb,
  Calendar,
  Dropdown,
  Link,
  moment,
  RiArrowGoBackFill,
  Spinner,
  Toast,
  useEffect,
  useFormik,
  useNavigate,
  useRef,
  useState,
} from "../share/dependencies";
import { TotalStockListApi } from "../components/apiCall";
function AddSales() {
  const items = [
    { label: "Sales", url: "/admin/sales" },
    { label: "Add Sales" },
  ];
  const home = { icon: "bi bi-house", url: "/admin" };
  let today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();
  let prevMonth = month === 0 ? 11 : month - 1;
  let prevYear = prevMonth === 11 ? year - 1 : year;
  let nextMonth = month === 11 ? 0 : month;
  let nextYear = nextMonth === 0 ? year + 1 : year;
  let minDate = new Date();

  minDate.setMonth(prevMonth);
  minDate.setFullYear(prevYear);

  let maxDate = new Date();

  maxDate.setMonth(nextMonth);
  maxDate.setFullYear(nextYear);

  const [value, setValue] = useState(null);
  const [ShopDrop, setShopDrop] = useState([]);
  const [shop, setShop] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [DataTable, setDataTable] = useState(false);
  const [totalStock, setTotalStock] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const navigate = useNavigate();

  // const typeOfSale = [
  //   { name: "Product", code: "PO" },
  //   { name: "Shop", code: "SH" },
  // ];
  // function productList() {
  //   fetch("http://localhost:3000/productList",{credentials: 'include'})
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data.result);
  //       if (data.result && data.result.length) {
  //         const formattedData = data.result.map((element) => ({
  //           _id: element._id,
  //           list: `${element.category.categoryName},${element.subCategories.name}, ML-${element.ml.ml}`,
  //           dueQuantity: element.dueQuantity,
  //         }));
  //         setProductData(formattedData);
  //       }
  //       console.log(productData);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }
  const TotalStockList = async () => {
    // fetch("http://localhost:3000/shopList",{credentials: 'include'})
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setShop(data.result);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //   });
    const result = await TotalStockListApi();
    console.log(result);
    const data = result.map((ele) => ({
      List: `${ele.category.categoryName},${ele.brandName.name}`,
      _id: ele._id,
      dueBrandQuantity: ele.dueBrandQuantity,
    }));
    setTotalStock(data);
  };
  useEffect(() => {
    TotalStockList();
  }, []);
  const initialValues = {
    totalStock: "",
    productId: "",
    shopId: "",
    date: "",
    salesQuntity: 0,
    quantity: 0,
    shopProductSale: "",
  };
  const handleChange = (e) => {
    formik.handleChange(e);
    const { value } = e.target;
    if (value) {
      setValue(value.code);
    }
    if (value.code == "PO") {
      setDataTable(false);
    }
    formik.setFieldValue("quantity", "");
    formik.setFieldValue("salesQuntity", "");
  };
  const shopHandleChange = (e) => {
    formik.handleChange(e);
    const { value } = e.target;
    console.log(value);
    const data = value.product.map((ele) => ({
      list: `${ele.category.categoryName},${ele.subCategories.name},${ele.ml.ml}`,
      shopQuntity: ele.shopQuntity,
    }));
    setShopDrop(data);
    setDataTable(true);
  };
  const handleCalendarFocus = () => {
    setTimeout(() => {
      const datePickerCollection =
        document.getElementsByClassName("p-datepicker");
      console.log(datePickerCollection.item);
      if (datePickerCollection.length) {
        const datePicker = datePickerCollection.item(0);
        datePicker.setAttribute("tabindex", "0");
        datePicker.focus();
      }
    }, 500);
  };
  const formik = useFormik({
    initialValues,
    // validationSchema: purchaseSchema,
    onSubmit: (values) => {
      console.log(values, formik);
      setValues(values);
    },
  });
  function setValues(valueData) {
    if (value == "SH") {
      var shopData = {
        typeOfSale: valueData.typeOfSale.name,
        shopId: valueData.shopId._id,
        date: moment(valueData.date).format("MM/DD/YYYY"),
        salesQuntity: valueData.salesQuntity,
        quantity: valueData.shopId.quantity,
      };
      var requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shopData),
        credentials: "include",
      };
      console.log(shopData);
      fetch("http://localhost:3000/salesCreate", requestOptions)
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
            setLoading(true);
            setTimeout(() => {
              navigate("/admin/sales");
            }, 2000);
          } else {
            toast.current.show({
              severity: "error",
              life: 3000,
              summary: "Error",
              detail: data.message,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (value == "PO") {
      console.log("object");
      var productData = {
        typeOfSale: valueData.typeOfSale.name,
        productId: valueData.productId._id,
        date: moment(valueData.date).format("MM/DD/YYYY"),
        salesQuntity: valueData.salesQuntity,
        quantity: valueData.quantity,
      };
      var requestOptionss = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
        credentials: "include",
      };
      console.log(productData);
      fetch("http://localhost:3000/salesCreate", requestOptionss)
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
            setLoading(true);
            setTimeout(() => {
              navigate("/admin/sales");
            }, 2000);
          } else {
            toast.current.show({
              severity: "error",
              life: 3000,
              summary: "Error",
              detail: data.message,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  const shopHandleForProduct = (e) => {
    formik.handleChange(e);
    const { value } = e.target;
    formik.setFieldValue("quantity", value.shopQuntity);
    if (value.shopQuntity) {
      formik.setFieldValue("quantity", value.shopQuntity);
    }
    console.log(value.shopQuntity);
  };
  return (
    <>
      <div className="p-5">
        <BreadCrumb model={items} home={home} className="my-5 w-72" />
        <div className="p-5 bg-[#254e58] rounded-md text-white">
          <div className="flex justify-between items-center mb-2 flex-wrap">
            <div>
              {" "}
              <h1 className="text-2xl max-[428px]:w-[100%] max-[428px]:mb-3">
                Add Sales
              </h1>
            </div>
            <p>
              <Link to={"/sales"} className="text-white flex items-center">
                <RiArrowGoBackFill className="mr-2" />
                Back
              </Link>
            </p>
          </div>
          <form
            action=""
            className="flex justify-between flex-wrap"
            onSubmit={formik.handleSubmit}
          >
            {/* <div className="w-[32%] max-[860px]:w-[49%] max-[622px]:w-[100%]">
                <label htmlFor="salesName" className="text-[17px]">
                  Sales Name<span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full p-3 shadow-sm rounded-md outline-none mt-2 mb-4"
                  placeholder="Sales Name"
                  type="text"
                  name="salesName"
                  id="salesName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.salesName}
                />
                {formik.errors.salesName && formik.touched.salesName ? (
                  <p className="text-red-500 mt-1 mb-2">
                    {formik.errors.salesName}
                  </p>
                ) : null}
              </div> */}
            <div className="w-[32%] max-[860px]:w-[49%] max-[622px]:w-[100%]">
              <label htmlFor="" className="text-[17px] text-white">
                Date<span className="text-red-500">*</span>
              </label>
              <Calendar
                value={formik.values.date}
                className="w-full md:w-14rem mt-2 mb-4 h-12 text-black"
                onChange={(e) => formik.setFieldValue("date", e.value)}
                onBlur={formik.handleBlur}
                readOnlyInput
                showIcon
                name="date"
                onFocus={handleCalendarFocus}
              />
            </div>
            <div className="w-[32%] max-[860px]:w-[49%] max-[622px]:w-[100%]">
              <label htmlFor="" className="text-[17px]">
                Type Of Sale<span className="text-red-500">*</span>
              </label>
              <Dropdown
                showClear
                options={totalStock}
                optionLabel="list"
                placeholder="Select Type Of Sale"
                filter
                name="List"
                onChange={handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.totalStock}
                className="w-full md:w-14rem mt-2"
              />
              {formik.errors.totalStock && formik.touched.totalStock ? (
                <p className="text-red-500 mt-1 mb-2">
                  {formik.errors.totalStock}
                </p>
              ) : null}
            </div>
            {value == "PO" && (
              <>
                <div className="w-[32%] max-[860px]:w-[49%] max-[622px]:w-[100%]">
                  <label htmlFor="productId" className="text-[17px] text-white">
                    Product details<span className="text-red-500">*</span>
                  </label>
                  <Dropdown
                    showClear
                    value={formik.values.productId}
                    onChange={(e) => {
                      formik.setFieldValue("productId", e.value);
                      console.log(e.value);
                      const selectedProduct = productData.find(
                        (product) => product._id === e.target.value._id
                      );
                      console.log(selectedProduct);
                      if (selectedProduct) {
                        formik.setFieldValue(
                          "quantity",
                          selectedProduct.dueQuantity
                        );
                      }
                    }}
                    onBlur={formik.handleBlur}
                    options={productData}
                    optionLabel="list"
                    optionValue="_id"
                    placeholder="Select Product"
                    filter
                    name="productId"
                    className="w-full md:w-14rem mt-2 mb-4"
                  />
                </div>
              </>
            )}

            {value == "SH" && (
              <>
                <div className="w-[32%] max-[860px]:w-[49%] max-[622px]:w-[100%]">
                  <label htmlFor="shopId" className="text-[17px] text-white">
                    Shop Name<span className="text-red-500">*</span>
                  </label>
                  <Dropdown
                    showClear
                    value={formik.values.shopId}
                    onChange={shopHandleChange}
                    onBlur={formik.handleBlur}
                    options={shop}
                    optionLabel="shopName"
                    optionValue="_id"
                    placeholder="Select Shop details"
                    filter
                    name="shopId"
                    className="w-full md:w-14rem mt-2 mb-4"
                  />
                </div>
                <div className="w-[32%] max-[860px]:w-[49%] max-[622px]:w-[100%]">
                  <label htmlFor="shopId" className="text-[17px] text-white">
                    Shop Product details<span className="text-red-500">*</span>
                  </label>
                  <Dropdown
                    showClear
                    value={formik.values.shopProductSale}
                    onChange={shopHandleForProduct}
                    onBlur={formik.handleBlur}
                    options={ShopDrop}
                    optionLabel="list"
                    optionValue="_id"
                    placeholder="Select Product Of Shop"
                    filter
                    name="shopProductSale"
                    className="w-full md:w-14rem mt-2 mb-4"
                  />
                </div>
              </>
            )}
            <div className="w-[32%] max-[860px]:w-[49%] max-[622px]:w-[100%]">
              <label htmlFor="quantity" className="text-[17px] text-white">
                Product Quantity<span className="text-red-500">*</span>
              </label>
              <input
                className="w-full p-3 shadow-sm rounded-md outline-none mt-2 mb-4 text-black"
                readOnly
                placeholder="Product Quantity"
                type="text"
                name="quantity"
                id="quantity"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="w-[32%] max-[860px]:w-[49%] max-[622px]:w-[100%]">
              <label htmlFor="salesQuntity" className="text-[17px]">
                Sales Quantity<span className="text-red-500">*</span>
              </label>
              <input
                className="w-full p-3 shadow-sm rounded-md outline-none mt-2 text-black"
                placeholder="Sales Quantity"
                type="number"
                name="salesQuntity"
                id="salesQuntity"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.salesQuntity}
              />
              {/* {formik.errors.salesQuntity && formik.touched.salesQuntity ? (
                  <p className="text-red-500 mt-1 mb-2">
                    {formik.errors.salesQuntity}
                  </p>
                ) : null} */}
            </div>
            <div className="w-[32%] max-[860px]:w-[49%] max-[622px]:w-[100%]"></div>
            <div className="w-[100%] flex justify-end gap-5 mt-3">
              <button
                className="px-5 py-2 text-lg rounded-md active:scale-[0.9] shadow-md bg-[#c0fb86] text-black"
                type="submit"
              >
                Submit
              </button>
              <Link to={"/admin/sales"}>
                <button
                  className="px-5 py-2 text-lg rounded-md active:scale-[0.9] shadow-md bg-zinc-400 text-white"
                  type="button"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      {loading && <Spinner />}
      <Toast ref={toast} />
    </>
  );
}

export default AddSales;
