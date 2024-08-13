// import React from 'react'

import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";

function Registration() {
  const toast = useRef(null);
  const [hide, setHide] = useState(false);
  const navigate = useNavigate();
  function showPassword(){
    setHide(!hide)
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validationSchema: purchaseSchema,
    onSubmit: (values) => {
      console.log(values, formik);
      setValue(values);
    },
  });
  function setValue(value) {
    // const data = {
    //   role: ['Admin'],
    //   email: value.email,
    //   password: value.password,
    // };
    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // };
    // fetch("http://localhost:3000/createUser", requestOptions)
    //   .then((res) => res.json())
    //   .then((resp) => {
    //     console.log(resp);
    //     if (resp.status == "success") {
    //       toast.current.show({
    //         severity: "success",
    //         life: 3000,
    //         summary: "Success",
    //         detail: resp.message,
    //       });
    //       setTimeout(() => {
    //         navigate("/");
    //       }, 2500);
    //     } else {
    //       toast.current.show({
    //         severity: "error",
    //         life: 3000,
    //         summary: "Error",
    //         detail: resp.message,
    //       });
    //     }
    //   });
  }
  return (
    <>
      <div className="flex flex-wrap h-screen bg-[#FFF7F1]">
        <div className="w-[100%] max-[744px]:w-[100%] flex justify-center items-center p-5">
          <div className="w-[60%] max-[744px]:w-[100%]">
            <div className="bg-[#163832] p-5 rounded-lg w-full">
              <h1 className="text-2xl text-white">Registration</h1>
              <form action="" onSubmit={formik.handleSubmit} className="w-full flex flex-wrap gap-5 mt-4">
                <div className="w-[49%] max-[622px]:w-[100%]">
                  <label htmlFor="email" className="text-[17px] text-white">
                  First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full p-3 shadow-sm rounded-md outline-none mt-2 mb-4"
                    placeholder="Enter First Name"
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="w-[49%] max-[622px]:w-[100%]">
                  <label htmlFor="email" className="text-[17px] text-white">
                  Last Name <span className="text-red-500"></span>
                  </label>
                  <input
                    className="w-full p-3 shadow-sm rounded-md outline-none mt-2 mb-4"
                    placeholder="Enter Last Name"
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="w-[49%] max-[622px]:w-[100%]">
                  <label htmlFor="email" className="text-[17px] text-white">
                  Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full p-3 shadow-sm rounded-md outline-none mt-2 mb-4"
                    placeholder="Enter Email"
                    type="text"
                    name="email"
                    id="lastName"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="w-[49%] max-[622px]:w-[100%]">
                  <label htmlFor="email" className="text-[17px] text-white">
                  Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className="w-full p-3 shadow-sm rounded-md outline-none mt-2 mb-4"
                    placeholder="Enter Address"
                    type="text"
                    name="address"
                    rows={1}
                    id="lastName"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="w-[100%] flex justify-end gap-5">
                  <button
                    className="px-5 py-2 text-lg rounded-md active:scale-[0.9] shadow-md bg-green-500 w-full text-white"
                    type="submit"
                  >
                    Registration
                  </button>
                </div>
              </form>
            </div>
            {/* <div className="bg-[#163832] p-4 rounded-lg text-[13px] cursor-pointer mt-3 text-white ">
              You Want To Create Account ?
            </div> */}
          </div>
        </div>
      </div>
      <Toast ref={toast} />
    </>
  );
}

export default Registration;
