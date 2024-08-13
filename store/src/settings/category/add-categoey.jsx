import { Link, useNavigate } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useFormik } from "formik";
import { Toast } from "primereact/toast";
import { useRef } from "react";

function AddCategoey() {
  const navigate = useNavigate()
  const toast = useRef(null);
      const initialValues = {
        description:"",
        categoryName:"",
      };
    
      const formik = useFormik({
        initialValues,
        // validationSchema: purchaseSchema,
        onSubmit: (values) => {
          console.log(values);
          setValue(values)
        },
      });
      function setValue(value) {
        console.log(value);
        const data = {
          description: value.description,
          categoryName: value.categoryName,
        };
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        };
        fetch(`http://localhost:3000/createCategory`, requestOptions)
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
                navigate('/admin/setting/Category');
              }, 2500);
            }else{
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
          <div className="p-5 bg-[#163832] rounded-md text-white">
            <div className="flex justify-between items-center mb-2 flex-wrap">
              <div>
                {" "}
                <h1 className="text-2xl max-[428px]:w-[100%] max-[428px]:mb-3">
                  Categoey Add
                </h1>
              </div>
              <p>
                <Link
                  to={"/admin/setting/Category"}
                  className="flex items-center"
                >
                  <RiArrowGoBackFill className="mr-2" />
                  Back
                </Link>
              </p>
            </div>
            <form
              action=""
              className="flex justify-between flex-wrap text-white"
              onSubmit={formik.handleSubmit}
            >
              <div className="w-[49%] max-[622px]:w-[100%]">
                <label htmlFor="productName" className="text-[17px]">
                  Category Name<span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full p-3 shadow-sm rounded-md outline-none mt-2 mb-4"
                  placeholder="Category Name"
                  type="text"
                  name="categoryName"
                  id="categoryName"
                  value={formik.values.categoryName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="w-[49%] max-[622px]:w-[100%]">
                <label htmlFor="description" className="text-[17px]">
                Description<span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full p-3 shadow-sm rounded-md outline-none mt-2 mb-4"
                  placeholder="Product Price"
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
                  className="px-5 py-2 text-lg rounded-md active:scale-[0.9] shadow-md bg-green-500 text-white"
                  type="submit"
                >
                  Submit
                </button>
                <Link to={"/admin/setting/Category"}>
                  {" "}
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
      <Toast ref={toast} />
    </>
  );
}

export default AddCategoey;
