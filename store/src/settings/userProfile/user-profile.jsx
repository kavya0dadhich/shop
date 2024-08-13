import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import eventEmitter  from "../../components/eventEmitter";
// import { Spinner } from "../../components/spinner";

function UserProfile() {
  // const [loading, setLoading] = useState(true);
  const [data, setData] = useState('');

  useEffect(() => {
    eventEmitter.on('dataChanged', (newData) => {
      setData(newData);
    });

    // Cleanup the listener on component unmount
    return () => {
      eventEmitter.off('dataChanged');
    };
  }, []);

  const details = {
    phoneNumber: "9521632162",
    email: "Kavya@gmail.com",
    sex: "Male",
    dob: "10/10/2002",
    password: "32154",
  };

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
                  <span>Mr. </span>Kavya Dadhich
                </p>
                <p className="text-slate-300">Ajmer</p>
              </h1>
              <div className="text-white text-2xl cursor-pointer">
                <AiFillEdit />
              </div>
            </div>
            <br />
            <hr className="bg-slate-500 border-slate-500" />
            <div className="text-white mt-3">
              <div className="w-[50%] border-r border-slate-500">
                <div className="flex gap-3">
                  <p className="text-md ">Phone Number :-</p>{" "}
                  <p className="text-slate-300 text-md">
                    {" "}
                    {/* {details.phoneNumber} */}
                    <p>Data: {data}</p>
                  </p>
                </div>
                <div className="flex gap-3">
                  <p className="text-md ">Email :-</p>{" "}
                  <p className="text-slate-300 text-md"> {details.email}</p>
                </div>
                <div className="flex gap-3">
                  <p className="text-md ">Password :-</p>{" "}
                  <p className="text-slate-300 text-md"> {details.password}</p>
                </div>
                <div className="flex gap-3">
                  <p className="text-md ">Gender :-</p>{" "}
                  <p className="text-slate-300 text-md"> {details.sex}</p>
                </div>
                <div className="flex gap-3">
                  <p className="text-md ">Date of Birth :-</p>{" "}
                  <p className="text-slate-300 text-md"> {details.dob}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {loading && <Spinner />} */}
    </>
  );
}

export default UserProfile;
