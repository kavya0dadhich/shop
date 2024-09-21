import { CategoryListApi, SubCategorieslist } from "../components/apiCall";
import {
  BreadCrumb,
  Dropdown,
  Form,
  Formik,
  Link,
  SelectButton,
  Spinner,
  Toast,
  useEffect,
  useNavigate,
  useRef,
  useState,
} from "../share/dependencies";

function AddOstock() {
  const items = [
    { label: "Opening Stock", url: "/admin/O-stock" },
    { label: "Add Opening Stock" },
  ];
  const home = { icon: "bi bi-house", url: "/admin" };
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // const [type, setType] = useState([]);
  const [brandName, setBrandName] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const options = ["English", "Hindi"];
  const [valueSelectButton, setValueSelectButton] = useState(options[0]);

  const toast = useRef(null);
  const initialValues = {
    category: "",
    brandName: "",
    quantity: "",
  };

  console.log(valueSelectButton);
  if (valueSelectButton == null) setValueSelectButton("English");

  const onSubmit = (value) => {
    console.log(value);
    const data = {
      category: value.category,
      brandName: {
        _id: value.brandName._id,
        brandQuantity: Number(value.quantity),
        Type: valueSelectButton,
        name: value.brandName.name,
      },
    };
    console.log(data);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    };
    fetch("http://localhost:3000/OstockCreate", requestOptions)
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
            navigate("/admin/O-stock");
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
  };
  const CategoryNameAPI = async () => {
    setLoading(true);
    try {
      const result = await CategoryListApi();
      if (result instanceof Error) {
        console.error("API fetch failed:", result.message);
        return;
      }
      setCategoryName(result);
      console.log(categoryName);
    } catch (error) {
      console.error("Error fetching subcategories:", error.message);
    } finally {
      setLoading(false);
    }
  };
  const brandNameAPI = async () => {
    setLoading(true);
    try {
      const result = await SubCategorieslist();
      if (result instanceof Error) {
        console.error("API fetch failed:", result.message);
        return;
      }
      console.log(result);
      setBrandName(result);
      console.log(brandName);
    } catch (error) {
      console.error("Error fetching subcategories:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    brandNameAPI();
    CategoryNameAPI();
  }, []);

  return (
    <>
      <div className="p-5">
        <BreadCrumb
          model={items}
          home={home}
          className="my-5 w-3/12 rounded-md"
        />
        <div className="p-5 bg-[#254e58] rounded-md">
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ values, handleChange, handleBlur }) => (
              <Form>
                <div className="flex justify-between items-center mb-2 flex-wrap">
                  <div>
                    <h1 className="text-2xl max-[428px]:w-[100%] max-[428px]:mb-3 text-white font-semibold">
                      Add Opening Stock
                    </h1>
                  </div>
                  <div className="card">
                    <SelectButton
                      value={valueSelectButton}
                      onChange={(e) => setValueSelectButton(e.value)}
                      options={options}
                      className="shadow-2xl"
                    />
                  </div>
                </div>
                <div className="flex justify-between flex-wrap mt-3">
                  <div className="w-[32%] max-[860px]:w-[49%] max-[622px]:w-[100%]">
                    <label htmlFor="type" className="text-[17px] text-white">
                      Category<span className="text-red-500">*</span>
                    </label>
                    <Dropdown
                      showClear
                      value={values.category}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      options={categoryName}
                      optionLabel="categoryName"
                      placeholder="Select Type"
                      filter
                      name="category"
                      className="w-full md:w-14rem mt-2 mb-4"
                    />
                  </div>
                  <div className="w-[32%] max-[860px]:w-[49%] max-[622px]:w-[100%]">
                    <label
                      htmlFor="brandName"
                      className="text-[17px] text-white"
                    >
                      Brand Name<span className="text-red-500">*</span>
                    </label>
                    <Dropdown
                      showClear
                      value={values.brandName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      options={brandName}
                      optionValue="_id"
                      optionLabel="name"
                      placeholder="Select Brand Name"
                      filter
                      name="brandName"
                      className="w-full md:w-14rem mt-2 mb-4"
                    />
                  </div>
                  <div className="w-[32%] max-[860px]:w-[49%] max-[622px]:w-[100%]">
                    <label
                      htmlFor="quantity"
                      className="text-[17px] text-white"
                    >
                      Quantity<span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full p-3 shadow-sm rounded-md outline-none mt-2 mb-4"
                      placeholder="Quantity"
                      type="text"
                      name="quantity"
                      id="quantity"
                      value={values.quantity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div className="w-[100%] flex justify-end gap-5 mt-3">
                    <button
                      className="px-5 py-2 text-lg rounded-md active:scale-[0.9] shadow-md bg-[#c0fb86]"
                      type="submit"
                    >
                      Submit
                    </button>
                    <Link to={"/admin/O-stock"}>
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
            )}
          </Formik>
        </div>
        {loading && <Spinner />}
        <Toast ref={toast} />
      </div>
    </>
  );
}

export default AddOstock;
