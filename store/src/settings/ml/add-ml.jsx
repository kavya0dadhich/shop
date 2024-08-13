import { Calendar, Form, Formik, Link, moment, Spinner, Toast, useNavigate, useRef, useState } from '../../share/dependencies'

function AddMl() {
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const navigate = useNavigate();
  const initialValues = {
    ml: "",
    quantity: 0,
    dueQuntity: 0,
    date: "",
    description: "",
  };
  const onSubmit = (values) => {
    console.log(values);
    const data = {
      ml: values.ml,
      quantity: values.quantity,
      dueQuntity: values.dueQuntity,
      date: moment(values.date).format("MM/DD/YYYY"),
      description: values.description,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:3000/createML", requestOptions)
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
            navigate("/admin/setting/ml");
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
  return (
    <>
      <div className="p-5 bg-[#163832] rounded-md">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ values, handleChange, handleBlur }) => (
            <>
              <Form>
                <div className="flex justify-between items-center mb-2 flex-wrap">
                  <div>
                    <h1 className="text-2xl max-[428px]:w-[100%] max-[428px]:mb-3 text-white font-semibold">
                      Add Ml
                    </h1>
                  </div>
                </div>
                <div className="flex justify-between flex-wrap mt-3">
                  <div className="w-[32%] max-[860px]:w-[49%] max-[622px]:w-[100%]">
                    <label htmlFor="date" className="text-[17px] text-white">
                      Data<span className="text-red-500"></span>
                    </label>
                    <Calendar
                      value={values.date}
                      className="w-full md:w-14rem mt-2 mb-4 h-12"
                      onChange={handleChange}
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
                    <label htmlFor="ml" className="text-[17px] text-white">
                      Ml<span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full p-3 shadow-sm rounded-md outline-none mt-2 mb-4"
                      placeholder="ML"
                      type="text"
                      name="ml"
                      id="ml"
                      value={values.ml}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div className="w-[32%] max-[860px]:w-[49%] max-[622px]:w-[100%]">
                    <label
                      htmlFor="description"
                      className="text-[17px] text-white"
                    >
                      Description<span className="text-red-500"></span>
                    </label>
                    <textarea
                      className="w-full p-3 shadow-sm rounded-md outline-none mt-2 mb-4"
                      placeholder="Description"
                      type="text"
                      name="description"
                      id="description"
                      rows={1}
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div className="w-[100%] flex justify-end gap-5 mt-3">
                    <button
                      className="px-5 py-2 text-lg rounded-md active:scale-[0.9] shadow-md bg-[#4f4a41] text-white"
                      type="submit"
                    >
                      Submit
                    </button>
                    <Link to={"/admin/setting/ml"}>
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
              </Form>
            </>
          )}
        </Formik>
      </div>
      <Toast ref={toast} />
      {loading && <Spinner />}
    </>
  );
}

export default AddMl;
