// import { useContext, useEffect, useRef, useState } from "react";
// import { AiFillEdit } from "react-icons/ai";
// // import eventEmitter  from "../../components/eventEmitter";
// import { Spinner } from "../../components/spinner";
// import { Toast } from "primereact/toast";
// import { MyContext } from "../../components/Myprovider";
// import { Spinner } from "../../components/spinner";

import {
  AiFillEdit,
  Dialog,
  Form,
  Formik,
  MyContext,
  Spinner,
  Toast,
  useContext,
  useEffect,
  useRef,
  useState,
} from "../../share/dependencies";

function UserProfile() {
  const [UserData, setUserData] = useState(true);
  const [visible, setVisible] = useState(false);
  // const [data, setDatas] = useState('');
  const [loading, setLoading] = useState(true);
  const toast = useRef(null);
  const { setData } = useContext(MyContext);
  // {credentials: 'include'}
  useEffect(() => {
    findUser();
    // eventEmitter.on('dataChanged', (newData) => {
    //   setDatas(newData);
    // });

    // // Cleanup the listener on component unmount
    // return () => {
    //   eventEmitter.off('dataChanged');
    // };
  }, []);

  const initialValues = {
    updateFirstName: "",
    updateLastName: "",
    updateEmail: "",
  };

  const findUser = async () => {
    const id = JSON.parse(localStorage.getItem("user"));
    console.log(id);
    const data = {
      id,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    };
    fetch("http://localhost:3000/findUser", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == "success") {
          setUserData(data.result[0]);
          setData(data.result[0]);
          // toast.current.show({
          //   severity: "success",
          //   life: 3000,
          //   summary: "Success",
          //   detail: data.message,
          // });
          setTimeout(() => {
            setLoading(false);
          }, 500);
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
  console.log(UserData);

  const details = {
    phoneNumber: UserData.phoneNumber,
    email: UserData.email,
    sex: UserData.phoneNumber,
    dob: UserData.DOB,
    password: UserData.password,
    firstName: UserData.firstName,
    lastName: UserData.lastName,
    address: UserData.address,
  };

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <>
      <div className="p-5 bg-[#163832] rounded-md flex">
        <div className="w-[40%] h-[20%]  p-2 justify-center flex">
          <img
            src="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=2048x2048&w=is&k=20&c=8QovDK9XochFpaIC-N3pn5EEaRSVuE1SKpQDVUxLSUk="
            className="w-[250px] h-[250px] object-cover rounded-full object-center shadow-lg"
            alt=""
          />
        </div>
        <div className="w-[80%]  p-2">
          <div className="p-2">
            <div className="flex justify-between">
              <h1 className="font-thin tracking-wider text-white">
                <p className="text-[35px]">
                  <span>Mr. </span>
                  {details.firstName} {details.lastName}
                </p>
                <p className="text-slate-300">{details.address}</p>
              </h1>
              <div className="text-white text-2xl cursor-pointer">
                <AiFillEdit
                  className="hover:scale-110 transition-all ease-in-out duration-150"
                  onClick={() => {
                    setVisible(true);
                  }}
                />
              </div>
            </div>
            <br />
            <hr className="bg-slate-500 border-slate-500" />
            <div className="text-white mt-3">
              <div className="w-[50%] border-r border-slate-500">
                <div className="flex gap-3 mb-2">
                  <p className="text-md bg-slate-500 rounded-xl p-2">
                    Phone Number :-
                  </p>{" "}
                  <p className="text-slate-100 text-md border border-gray-500 p-2 rounded-xl">
                    {" "}
                    <p>{details.phoneNumber}</p>
                  </p>
                </div>
                <div className="flex gap-3 mb-2">
                  <p className="text-md bg-slate-500 rounded-xl p-2">
                    Email :-
                  </p>{" "}
                  <p className="text-slate-100 text-md border border-gray-500 p-2 rounded-xl">
                    {" "}
                    {details.email}
                  </p>
                </div>
                <div className="flex gap-3 mb-2">
                  <p className="text-md bg-slate-500 rounded-xl p-2">
                    Date of Birth:-
                  </p>{" "}
                  <p className="text-slate-100 text-md border border-gray-500 p-2 rounded-xl">
                    {details.dob}
                  </p>
                </div>
                <div className="flex gap-3 mt-2">
                  <p className="text-md bg-slate-500 rounded-xl p-2">
                    Password :-
                  </p>{" "}
                  <p className="text-slate-100 text-md border border-gray-500 p-2 rounded-xl cursor-pointer ">
                    .........
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading && <Spinner />}
      <Toast ref={toast} />

      <Dialog
        header="Header"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
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
                <div className="w-[32%] max-[860px]:w-[49%] max-[622px]:w-[100%]">
                  <label
                    htmlFor="updateFirstName"
                    className="text-[17px] text-white"
                  >
                    First Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full p-3 shadow-sm rounded-md outline-none mt-2 mb-4"
                    readOnly
                    placeholder="Product Quantity"
                    type="text"
                    name="updateFirstName"
                    id="updateFirstName"
                    value={values.updateFirstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="w-[32%] max-[860px]:w-[49%] max-[622px]:w-[100%]">
                  <label
                    htmlFor="updateLastName"
                    className="text-[17px] text-white"
                  >
                    Last Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full p-3 shadow-sm rounded-md outline-none mt-2 mb-4"
                    readOnly
                    placeholder="Product Quantity"
                    type="text"
                    name="updateLastName"
                    id="updateLastName"
                    value={values.updateLastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="w-[32%] max-[860px]:w-[49%] max-[622px]:w-[100%]">
                  <label
                    htmlFor="updateEmail"
                    className="text-[17px] text-white"
                  >
                    Emaill<span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full p-3 shadow-sm rounded-md outline-none mt-2 mb-4"
                    readOnly
                    placeholder="Product Quantity"
                    type="text"
                    name="updateEmail"
                    id="updateEmail"
                    value={values.updateEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
}

export default UserProfile;
