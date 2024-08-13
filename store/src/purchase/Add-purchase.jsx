import { CategoryListApi, MLApi } from '../components/apiCall';

import  { BreadCrumb, Calendar, Dropdown, Link, moment, Spinner, Toast, useEffect, useFormik, useNavigate, useRef, useState } from '../share/dependencies'

function AddPurchase() {
  const items = [
    { label: 'Purchase', url:"/admin/purchase" },
    { label: 'Add Purchase',  },
];
const home = { icon: 'bi bi-house', url: '/admin' };
  const [category, setCategory] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [ml, setMl] = useState([]);
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
    category: "",
    subCategories: "",
    quantity: 0,
    ml: "",
    address: "",
    date: "",
  };
  useEffect(() => {
    const fetchCategories = async () => {
      const result = await CategoryListApi();
      if (result instanceof Error) {
        console.log("Api fail to fatch");
      } else {
        setCategory(result);
      }
    };
    const fetchml = async () => {
      const result = await MLApi();
      if (result instanceof Error) {
        console.log("Api fail to fatch");
      } else {
        setMl(result);
      }
    };
    fetchml();
    fetchCategories();
  }, []);

  const formik = useFormik({
    initialValues,
    // validationSchema: purchaseSchema,
    onSubmit: (values) => {
      console.log(values.date);
      setValue(values);
    },
  });
  function setValue(value) {
    const data = {
      category:
        {
          id: value.category._id,
          categoryName: value.category.categoryName,
        } || null,
      subCategories:
        {
          id: value.subCategories._id,
          name: value.subCategories.name,
        } || null,
      quantity: value.quantity || null,
      ml: value.ml || null,
      address: value.address || null,
      date: moment(value.date).format("MM/DD/YYYY"),
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:3000/createProduct", requestOptions)
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
            navigate("/admin/purchase");
          }, 2500);
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
  const handleChange = (e) => {
    formik.handleChange(e);
    const { value } = e.target;
    console.log(value);
    if (value.subCategories) {
      setSubCategories(value.subCategories);
    }
  };
  return (
    <>
    <div className="p-5">
    <BreadCrumb model={items} home={home} className="my-5 w-72"/>
      <div className="p-5 bg-[#254e58] rounded-md">
        <div className="flex justify-between items-center mb-2 flex-wrap">
          <div>
            {" "}
            <h1 className="text-2xl max-[428px]:w-[100%] max-[428px]:mb-3 text-white font-semibold">
              Purchase Add
            </h1>
          </div>
        </div>
        <form
          action=""
          className="flex justify-between flex-wrap mt-3"
          onSubmit={formik.handleSubmit}
        >
          <div className="w-[32%] max-[860px]:w-[49%] max-[622px]:w-[100%]">
            <label htmlFor="" className="text-[17px] text-white">
              Date<span className="text-red-500">*</span>
            </label>
            <Calendar
              value={formik.values.date}
              className="w-full md:w-14rem mt-2 mb-4 h-12"
              onChange={(e) => formik.setFieldValue("date", e.value)}
              onBlur={formik.handleBlur}
              minDate={minDate}
              maxDate={maxDate}
              readOnlyInput
              showIcon
              name="date"
              onFocus={handleCalendarFocus}
            />
          </div>
          <div className="w-[32%] max-[860px]:w-[49%] max-[622px]:w-[100%]">
            <label htmlFor="" className="text-[17px] text-white">
              Category Name<span className="text-red-500">*</span>
            </label>
            <Dropdown
              showClear
              value={formik.values.category}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              options={category}
              optionLabel="categoryName"
              optionValue="_id"
              placeholder="Select Category"
              filter
              name="category"
              className="w-full md:w-14rem mt-2 mb-4"
            />
          </div>
          <div className="w-[32%] max-[860px]:w-[49%] max-[622px]:w-[100%]">
            <label htmlFor="" className="text-[17px] text-white">
              Sub Category Name<span className="text-red-500">*</span>
            </label>
            <Dropdown
              showClear
              value={formik.values.subCategories}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              optionValue="_id"
              options={subCategories}
              optionLabel="name"
              placeholder="Select Sub Category"
              filter
              name="subCategories"
              className="w-full md:w-14rem mt-2 mb-4"
            />
          </div>
          <div className="w-[32%] max-[860px]:w-[49%] max-[622px]:w-[100%]">
            <label htmlFor="ml" className="text-[17px] text-white">
              ML<span className="text-red-500">*</span>
            </label>
            <Dropdown
              showClear
              value={formik.values.ml}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={ml}
              optionLabel="ml"
              optionValue="_id"
              placeholder="Select ML"
              filter
              name="ml"
              className="w-full md:w-14rem mt-2 mb-4"
            />
          </div>
          <div className="w-[32%] max-[860px]:w-[49%] max-[622px]:w-[100%]">
            <label htmlFor="quantity" className="text-[17px] text-white">
              Product Quantity<span className="text-red-500">*</span>
            </label>
            <input
              className="w-full p-3 shadow-sm rounded-md outline-none mt-2 mb-4"
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
            <label htmlFor="address" className="text-[17px] text-white">
              Product Address<span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full p-3 shadow-sm rounded-md outline-none mt-2 mb-4"
              placeholder="Product Address"
              type="text"
              name="address"
              rows={1}
              id="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
          </div>
          <div className="w-[100%] flex justify-end gap-5 mt-3">
            <button
              className="px-5 py-2 text-lg rounded-md active:scale-[0.9] shadow-md bg-[#c0fb86] "
              type="submit"
            >
              Submit
            </button>
            <Link to={"/admin/purchase"}>
              {" "}
              <button
                className="px-5 py-2 text-lg rounded-md active:scale-[0.9] shadow-md bg-[#6e6658] text-white"
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

export default AddPurchase;
