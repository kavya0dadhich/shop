// import React from 'react'

import loginPage from "../assets/loginPage.svg";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

function login() {
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
    const data = {
      role: ['Admin'],
      email: value.email,
      password: value.password,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: 'include',
    };
    fetch("http://localhost:3000/login", requestOptions)
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
            navigate("/admin");
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
        <div className="w-[50%] max-[744px]:w-[100%] m-auto">
          <img src={loginPage} alt="" />
        </div>
        <div className="w-[50%] max-[744px]:w-[100%] flex justify-center items-center p-5">
          <div className="w-[70%]  max-[744px]:w-[100%]">
            <div className="bg-[#163832] p-5 rounded-lg ">
              <form action="" onSubmit={formik.handleSubmit}>
                <div className="w-[100%]">
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
                </div>
                <div className="w-[100%] relative">
                  <label htmlFor="password" className="text-[17px] text-white">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full p-3 shadow-sm rounded-md outline-none mt-2 mb-4"
                    placeholder="Enter Password"
                    type={!hide ? "password" : "text"}
                    name="password"
                    id="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <div className="absolute cursor-pointer text-2xl right-5 bottom-7" onClick={showPassword}>
                    {!hide ? <FaEyeSlash /> :  <FaEye />}
                  </div>
                </div>
                <div className="w-[100%] flex justify-end gap-5 ">
                  <div className="text-blue-500 text-sm cursor-pointer hover:underline">
                    Forgot Password ?
                  </div>
                </div>
                <div className="w-[100%] flex justify-end gap-5 mt-5">
                  <button
                    className="px-5 py-2 text-lg rounded-md active:scale-[0.9] shadow-md bg-green-500 w-full text-white"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
            <Link to={'/registration'} > <div className="bg-[#163832] p-4 rounded-lg text-[13px] cursor-pointer mt-3 text-white ">
              You Want To Create Account ?
            </div> 
            </Link>
          </div>
        </div>
      </div>
      <Toast ref={toast} />
    </>
  );
}

export default login;
