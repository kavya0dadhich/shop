// import { Dropdown } from "primereact/dropdown";
// import { useEffect, useRef, useState } from "react";
// import { Toast } from "primereact/toast";
// import { Calendar } from "primereact/calendar";
// import { Formik, Form } from "formik";
// import { Link, useNavigate } from "react-router-dom";
// import moment from "moment";
// import { Spinner } from "../components/spinner";
import "../App.css";
import  {  Calendar, Dropdown, Form, Formik, Link, moment, Spinner, Toast, useEffect,  useNavigate, useRef, useState,BreadCrumb } from '../share/dependencies'

function AddDisbursement() {
  const items = [
    { label: 'Disbursement', url:"/admin/disbursement" },
    { label: 'Add Disbursement',  },
];
const home = { icon: 'bi bi-house', url: '/admin' };
  const [productData, setProductData] = useState([]);
  const [shop, setShop] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  let today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();
  let prevMonth = month === 0 ? 11 : month - 1;
  let prevYear = prevMonth === 11 ? year - 1 : year;
  let nextMonth = month === 11 ? 0 : month + 1;
  let nextYear = nextMonth === 0 ? year + 1 : year;
  let minDate = new Date();
  minDate.setMonth(prevMonth);
  minDate.setFullYear(prevYear);
  let maxDate = new Date();
  maxDate.setMonth(nextMonth);
  maxDate.setFullYear(nextYear);

  const toast = useRef(null);

  const initialValues = {
    productID: "",
    date: "",
    shopID: "",
    disperseQuantity: 0,
    note: "",
  };

  useEffect(() => {
    fetch("http://localhost:3000/productList" ,{credentials: "include",})
      .then((res) => res.json())
      .then((data) => {
        if (data.result && data.result.length) {
          const formattedData = data.result.map((element) => ({
            _id: element._id,
            list: `${element.category.categoryName},${element.subCategories.name}, ML-${element.ml.ml}`,
            dueQuantity: element.dueQuantity,
          }));
          setProductData(formattedData);
          console.log(formattedData);
        }
      });
    fetch("http://localhost:3000/shopList",{credentials: "include",})
      .then((res) => res.json())
      .then((data) => {
        if (data.result && data.result.length) {
          console.log(data.result);
          setShop(data.result);
        }
      });
  }, []);

  const handleCalendarFocus = () => {
    setTimeout(() => {
      const datePickerCollection =
        document.getElementsByClassName("p-datepicker");
      if (datePickerCollection.length) {
        const datePicker = datePickerCollection.item(0);
        datePicker.setAttribute("tabindex", "0");
        datePicker.focus();
      }
    }, 500);
  };


  const onSubmit = (values) => {
    if (values.disperse >= values.quantity) {
      console.log("grater");
      return toast.current.show({
        severity: "error",
        life: 3000,
        summary: "Error",
        detail: "Dispersed quantity cannot be greater than available quantity.",
      });
    }
    const data = {
      disperseQuantity: Number(values.disperse),
      date: moment(values.date).format("MM/DD/YYYY"),
      productID:values.productID._id,
      shopID:values.shopID._id,
    };
    console.log("Form data", data);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    };
    fetch("http://localhost:3000/createDirsperment", requestOptions)
    .then((res) => res.json())
    .then((data) => { 
      console.log(data);
      if (data.status == "success") {
          setLoading(true);
          toast.current.show({
            severity: "success",
            life: 3000,
            summary: "Success",
            detail: data.message,
          });
          setTimeout(() => {
            navigate("/admin/disbursement");
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
  };

  return (
    <>
    <div className="p-5">
    <BreadCrumb model={items} home={home} className="my-5 w-96"/>
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      
      {({ values, handleChange, handleBlur, setFieldValue }) => (
        <Form>
              <div className="p-5 bg-[#254e58] rounded-md">
                <div className="flex justify-between items-center mb-2 flex-wrap">
                  <div>
                    <h1 className="text-2xl max-[428px]:w-[100%] max-[428px]:mb-3 text-white font-semibold">
                      Disbursement Add
                    </h1>
                  </div>
                </div>
                <div className="flex justify-between flex-wrap mt-3">
                  <div className="w-[32%] max-[860px]:w-[49%] max-[622px]:w-[100%]">
                    <label htmlFor="date" className="text-[17px] text-white">
                      Data<span className="text-red-500">*</span>
                    </label>
                    <Calendar
                      value={values.date}
                      className="w-full md:w-14rem mt-2 mb-4 h-12"
                      onChange={(e) => setFieldValue("date", e.value)}
                      onBlur={handleBlur}
                      minDate={minDate}
                      maxDate={maxDate}
                      readOnlyInput
                      placeholder="Select Date"
                      showIcon
                      name="date"
                      dateFormat="mm/dd/yy"
                      onFocus={handleCalendarFocus}
                    />
                  </div>
                  <div className="w-[32%] max-[860px]:w-[49%] max-[622px]:w-[100%]">
                    <label
                      htmlFor="productID"
                      className="text-[17px] text-white"
                    >
                      Product details<span className="text-red-500">*</span>
                    </label>
                    <Dropdown
                      showClear
                      value={values.productID}
                      onChange={(e) => {
                        setFieldValue("productID", e.value);
                        const selectedProduct = productData.find(
                          (product) => product._id === e.target.value._id
                        );
                        console.log(selectedProduct);
                        if (selectedProduct) {
                          setFieldValue("quantity", selectedProduct.dueQuantity);
                        }
                      }}
                      onBlur={handleBlur}
                      options={productData}
                      optionLabel="list"
                      optionValue="_id"
                      placeholder="Select Product"
                      filter
                      name="productID"
                      className="w-full md:w-14rem mt-2 mb-4"
                    />
                  </div>

                  <div className="w-[32%] max-[860px]:w-[49%] max-[622px]:w-[100%]">
                    <label
                      htmlFor="quantity"
                      className="text-[17px] text-white"
                    >
                      Product Quantity<span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full p-3 shadow-sm rounded-md outline-none mt-2 mb-4"
                      readOnly
                      placeholder="Product Quantity"
                      type="text"
                      name="quantity"
                      id="quantity"
                      value={values.quantity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div className="w-[32%] max-[860px]:w-[49%] max-[622px]:w-[100%]">
                    <label htmlFor="shopID" className="text-[17px] text-white">
                      Shop<span className="text-red-500">*</span>
                    </label>
                    <Dropdown
                      showClear
                      value={values.shopID}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      options={shop}
                      optionLabel="shopName"
                      optionValue="_id"
                      placeholder="Select Shop"
                      filter
                      name="shopID"
                      className="w-full md:w-14rem mt-2 mb-4"
                    />
                  </div>

                  <div className="w-[32%] max-[860px]:w-[49%] max-[622px]:w-[100%]">
                    <label
                      htmlFor="disperse"
                      className="text-[17px] text-white"
                    >
                      Disperse Quantity<span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full p-3 shadow-sm rounded-md outline-none mt-2 mb-4"
                      placeholder="Disperse Quantity"
                      type="text"
                      name="disperse"
                      id="disperse"
                      value={values.disperse}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div className="w-[32%] max-[860px]:w-[49%] max-[622px]:w-[100%]">
                    <label htmlFor="note" className="text-[17px] text-white">
                      Note<span className="text-red-500"></span>
                    </label>
                    <textarea
                      className="w-full p-3 shadow-sm rounded-md outline-none mt-2 mb-4"
                      placeholder=""
                      type="text"
                      name="note"
                      rows={1}
                      id="note"
                      value={values.note}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div className="w-[100%] flex justify-end gap-5 mt-3">
                    <button
                      className="px-5 py-2 text-lg rounded-md active:scale-[0.9] shadow-md bg-[#c0fb86] "
                      type="submit"
                    >
                      Submit
                    </button>
                    <Link to={"/admin/disbursement"}>
                      {" "}
                      <button
                        className="px-5 py-2 text-lg rounded-md active:scale-[0.9] shadow-md bg-[#6e6658] text-white"
                        type="button"
                      >
                        Cancel
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
          <Toast ref={toast} />
        </Form>
      )}
    </Formik>
    </div>
      {loading && <Spinner />}
    </>
  );
}

export default AddDisbursement;
