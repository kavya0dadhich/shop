// import { RiArrowGoBackFill } from "react-icons/ri";
// import { Link, useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import { Toast } from "primereact/toast";
// import { useEffect, useRef, useState } from "react";
// import { Dropdown } from "primereact/dropdown";
import {
  BreadCrumb,
  Link,
  RiArrowGoBackFill,
  Toast,
  useEffect,
  useFormik,
  useNavigate,
  useRef,
} from "../../share/dependencies";

function AddSubCategory() {
  const toast = useRef(null);
  // const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const items = [
    { label: "Brand", url: "/admin/setting/subCategory" },
    { label: "Add Sub Category" },
  ];
  const home = { icon: "bi bi-house", url: "/admin" };
  useEffect(() => {
    fetch("http://localhost:3000/categoryList", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        // if (data.result) setCategory(data.result);
        console.log(data);
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
  const initialValues = {
    description: "",
    name: "",
    category: "",
  };
  const formik = useFormik({
    initialValues,
    // validationSchema: purchaseSchema,
    onSubmit: (values) => {
      console.log(values);
      setValue(values);
    },
  });
  function setValue(value) {
    console.log(value);
    const data = {
      description: value.description,
      name: value.name,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    };
    fetch(
      `http://localhost:3000/createSubCategories`,
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
          setTimeout(() => {
            navigate("/admin/setting/subCategory");
          }, 1000);
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
  return (
    <>
      <div className="p-5">
        <BreadCrumb model={items} home={home} className="my-5 w-[25rem]" />
        <div className="p-5 bg-[#254e58] rounded-md text-white">
          <div className="flex justify-between items-center mb-2 flex-wrap">
            <div>
              {" "}
              <h1 className="text-2xl max-[428px]:w-[100%] max-[428px]:mb-3">
                Brand Name Add
              </h1>
            </div>
            <p>
              <Link
                to={"/admin/setting/subCategory"}
                className="flex items-center"
              >
                <RiArrowGoBackFill className="mr-2" />
                Back
              </Link>
            </p>
          </div>
          <form
            action=""
            className="flex justify-between flex-wrap mt-5"
            onSubmit={formik.handleSubmit}
          >
            {/* <div className="w-[32%] max-[860px]:w-[49%] max-[622px]:w-[100%]">
                <label htmlFor="" className="text-[17px]">
                  Category Name<span className="text-red-500">*</span>
                </label>
                <Dropdown
                  showClear
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  options={category}
                  optionLabel="categoryName"
                  optionValue="_id"
                  placeholder="Select Category"
                  filter
                  name="category"
                  className="w-full md:w-14rem mt-2 mb-4"
                />
              </div> */}
            <div className="w-[49%] max-[622px]:w-[100%]">
              <label htmlFor="productName" className="text-[17px]">
                Sub Category Name<span className="text-red-500">*</span>
              </label>
              <input
                className="w-full p-3 shadow-sm rounded-md outline-none mt-2 mb-4 text-black"
                placeholder="Sub Category Name"
                type="text"
                name="name"
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="w-[49%] max-[622px]:w-[100%]">
              <label htmlFor="description" className="text-[17px]">
                Description <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full p-3 shadow-sm rounded-md outline-none mt-2 mb-4 text-black"
                placeholder="Description"
                type="text"
                name="description"
                id="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="w-[100%] flex justify-end gap-5 mt-3">
              <button
                className="px-5 py-2 text-lg rounded-md active:scale-[0.9] shadow-md bg-[#c0fb86] text-black"
                type="submit"
              >
                Submit
              </button>
              <Link to={"/admin/setting/subCategory"}>
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
        <Toast ref={toast} />
      </div>
    </>
  );
}

export default AddSubCategory;
