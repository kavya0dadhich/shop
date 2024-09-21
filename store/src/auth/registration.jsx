  // import React from 'react'

  // import { Toast } from "primereact/toast";
  // import { useRef, useState } from "react";
  // import { useFormik } from "formik";
  // import { useNavigate } from "react-router";
  import {
    Calendar,
    Toast,
    useFormik,
    useNavigate,
    useRef,
  } from "../share/dependencies";
  import { registrationSchema } from "../schemas";
import { handleCalendarFocus } from "../components/calendarFocus";
  function Registration() {
    const toast = useRef(null);
    // const [hide, setHide] = useState(false);
    const navigate = useNavigate();
    // function showPassword(){
    //   setHide(!hide)
    // }
    const formik = useFormik({
      initialValues: {
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        DOB: "",
        password:"",
      },
      validationSchema: registrationSchema,
      onSubmit: (values) => {
        console.log(values);
        setValue(values);
      },
    });
    function setValue(value) {
      const data = {
        role: ['Admin'],
        email: value.email,
        password: value.password, 
        firstName: value.firstName,
        lastName: value.lastName,
        address: value.address,
        DOB: value.DOB,
        phoneNumber: value.phoneNumber,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      fetch(`${import.meta.env.VITE_BACKEND_API_URL}/createRegister`, requestOptions)
        .then((res) => res.json())
        .then((resp) => {
          console.log(resp);
          if (resp.status == "success") {
            toast.current.show({
              severity: "success",
              life: 3000,
              summary: "Success",
              detail: resp.message,
            });
            setTimeout(() => {
              navigate("/");
            }, 2500);
          } else {
            toast.current.show({
              severity: "error",
              life: 3000,
              summary: "Error",
              detail: resp.message,
            });
          }
        });
    }

    return (
      <>
        <div className="flex flex-wrap h-screen bg-[#FFF7F1]">
          <div className="w-[100%] max-[744px]:w-[100%] flex justify-center items-center p-5">
            <div className="w-[60%] max-[744px]:w-[100%]">
              <div className="bg-[#163832] p-5 rounded-lg w-full">
                <h1 className="text-3xl font-bold text-white">
                  Registration as a New User
                </h1>
                <form
                  action=""
                  onSubmit={formik.handleSubmit}
                  className="w-full flex flex-wrap gap-5 mt-4"
                >
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
                    {formik.errors.firstName && formik.touched.firstName ? (
                      <p className="text-red-500 mt-1 mb-2">
                        {formik.errors.firstName}
                      </p>
                    ) : null}
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
                    {formik.errors.lastName && formik.touched.lastName ? (
                      <p className="text-red-500 mt-1 mb-2">
                        {formik.errors.lastName}
                      </p>
                    ) : null}
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
                      id="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.email && formik.touched.email ? (
                      <p className="text-red-500 mt-1 mb-2">
                        {formik.errors.email}
                      </p>
                    ) : null}
                  </div>
                  <div className="w-[49%] max-[622px]:w-[100%]">
                    <label htmlFor="password" className="text-[17px] text-white">
                    Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full p-3 shadow-sm rounded-md outline-none mt-2 mb-4"
                      placeholder="Enter Password"
                      type="text"
                      name="password"
                      id="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.password && formik.touched.password ? (
                      <p className="text-red-500 mt-1 mb-2">
                        {formik.errors.password}
                      </p>
                    ) : null}
                  </div>
                  <div className="w-[49%] max-[622px]:w-[100%]">
                    <label htmlFor="" className="text-[17px] text-white">
                      Date fo Birth<span className="text-red-500">*</span>
                    </label>
                    <Calendar
                      value={formik.values.DOB}
                      className="w-full md:w-14rem mt-2 mb-4 h-12 text-black"
                      onChange={(e) => formik.setFieldValue("DOB", e.value)}
                      onBlur={formik.handleBlur}
                      readOnlyInput
                      placeholder="Date fo Birth"
                      showIcon
                      name="DOB"
                      onFocus={handleCalendarFocus}
                    />
                  </div>
                  <div className="w-[49%] max-[622px]:w-[100%]">
                    <label
                      htmlFor="phoneNumber"
                      className="text-[17px] text-white"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full p-3 shadow-sm rounded-md outline-none mt-2 mb-4"
                      placeholder="Enter Phone Number"
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.phoneNumber && formik.touched.phoneNumber ? (
                      <p className="text-red-500 mt-1 mb-2">
                        {formik.errors.phoneNumber}
                      </p>
                    ) : null}
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
                      id="address"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.address && formik.touched.address ? (
                      <p className="text-red-500 mt-1 mb-2">
                        {formik.errors.address}
                      </p>
                    ) : null}
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
            </div>
          </div>
        </div>
        <Toast ref={toast} />
      </>
    );
  }

  export default Registration;
