import { useContext } from "react";
import admin from "../assets/admin.svg";
// import { DatePicker } from 'antd';
// const { RangePicker } = DatePicker;
import {
  HighchartsReact,
  Highcharts,
  useState,
  Calendar,
  moment,
  useEffect,
  DataTable,
  Column,
  Link,
} from "../share/dependencies";
import { MyContext } from "../components/Myprovider";
import imageForSales from "../assets/4256900.png";
import imageForPurchase from "../assets/7078316.png";

function Dashbord() {
  const [dates, setDates] = useState([
    moment().subtract(6, "month").toDate(),
    moment().toDate(),
  ]);
  const { data } = useContext(MyContext);
  const [chartData, setChartData] = useState([]);
  const [monthNameA, setMonthNameA] = useState();
  const [purchaseQuantity, setPurchaseQuantity] = useState();
  const [salesQuantity, setSalesQuantity] = useState();
  const [CardData, setCardData] = useState();
  const [ShopData, setShopData] = useState([]);

  useEffect(() => {
    if (chartData?.length > 0) {
      var salesQ = chartData.map((ele) => {
        return ele.salesQ;
      });
      var monthName = chartData.map((ele) => {
        return ele.monthName;
      });
      var purchaseQ = chartData.map((ele) => {
        return ele.purchaseQ;
      });
      setMonthNameA(monthName);
      setPurchaseQuantity(purchaseQ);
      setSalesQuantity(salesQ);
      console.log(monthName, purchaseQ, salesQ);
    }
  }, [chartData]);
  console.log(data);
  // useEffect(() => {
  //   if (chartDataS.length > 0) {
  //     var data = chartDataS.map((ele) => {
  //       console.log(ele);
  //       return ele.totalQuantity;
  //     });
  //     setQforP(data);
  //   }
  // }, [chartDataS]);
  // console.log(QforP, QforS);
  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Purchase and Sales quantity",
      align: "right",
    },
    // subtitle: {
    //     text:
    //         'Source: <a target="_blank" ' +
    //         'href="https://www.indexmundi.com/agriculture/?commodity=corn">indexmundi</a>',
    //     align: 'left'
    // },
    xAxis: {
      crosshair: true,
      accessibility: {
        description: "month Name",
      },
      categories: monthNameA,
    },
    // yAxis: {
    //     min: 0,
    //     title: {
    //         text: '1000 metric tons (MT)'
    //     }
    // },
    // tooltip: {
    //     valueSuffix: ' (1000 MT)'
    // },
    plotOptions: {
      column: {
        pointPadding: 0.1,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Pruchase",
        data: purchaseQuantity,
        color: "red", // Line color
        lineWidth: 3, // Line width
      },
      {
        name: "Sales",
        data: salesQuantity,
        color: "green", // Line color
        lineWidth: 3, // Line width
      },
    ],
  };
  useEffect(() => {
    if (dates) {
      setDateValue(dates);
    }
  }, [dates]);
  const handleChange = (e) => {
    setDates(e.value);
    console.log(dates);
    setDateValue(e.value);
  };
  function setDateValue(value) {
    console.log(value);
    const date = {
      startDate: moment(value[0]).format("MM/DD/YYYY"),
      endDate: moment(value[1]).format("MM/DD/YYYY"),
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(date),
      credentials: "include",
    };
    console.log(import.meta.env.VITE_BACKEND_API_URL);
    fetch(`${import.meta.env.VITE_BACKEND_API_URL}/dashboard`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log(data);
          setChartData(data.result);
        }
      });
    fetch(`${import.meta.env.VITE_BACKEND_API_URL}/cardDetails`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log(data);
          setCardData(data.result);
        }
      });
    fetch(`${import.meta.env.VITE_BACKEND_API_URL}/allShop`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log(data);

          // const ShopFilterData = data.shopdetails.flatMap(
          //   (shop) => shop.product
          // );
          setShopData(data.shopdetails);
        }
      });
  }

  useEffect(() => {
    console.log(ShopData); // Log ShopData whenever it updates
  }, [ShopData]);

  return (
    <>
      <div className="p-10">
        <div className="bg-green-100 p-16 rounded-xl flex flex-nowrap relative">
          <div className="w-[50%] max-[1380px]: text-[50px] max-[914px]:w-[100%]">
            Welcome To Work, <span className="text-blue-400"> {name} </span>{" "}
          </div>
          <div className="w-[50%] max-[914px]:w-0">
            <img
              className="w-[350px] h-[350px] absolute max-[1380px]:-top-[20px] max-[914px]:hidden -top-[45%] drop-shadow right-[13%]"
              src={admin}
              alt=""
            />
          </div>
        </div>
        <div className="mt-5">
          <div className="py-5">
            <div>
              <div className="w-[32%] max-[860px]:w-[49%] max-[622px]:w-[100%]">
                {/* <label htmlFor="" className="text-[17px] text-black">
                  Date<span className="text-red-500">*</span>
                </label> */}
                {/* <RangePicker value={dates} onChange={(e) => setDates(e.map((item)=>{return moment(item).format("MM/DD/YYYY")}))} className="w-full md:w-14rem mt-2 mb-4 h-12 cur"/> */}
                <Calendar
                  value={dates}
                  onChange={handleChange}
                  selectionMode="range"
                  readOnlyInput
                  hideOnRangeSelection
                  className="w-full md:w-14rem mt-2 mb-4 h-12 cur"
                  showIcon
                />
              </div>
            </div>
            <div className="mt-4 mb-10 flex justify-between">
              {CardData && CardData[0] ? (
                <>
                  <div className="w-[49%] max-[622px]:w-[100%] border-l rounded-xl shadow-md p-8 bg-green-100/70">
                    <div className="w-24 object-fill h-20 ">
                      <img
                        src={imageForPurchase}
                        className="w-[72%]"
                        alt="image is not found"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-[20px]">
                        Total Purchase
                      </h3>
                      <div className="">
                        <span className="text-red-600 font-bold text-[22px]">
                          {" "}
                          {CardData && CardData[0]
                            ? CardData[0].totalPurchase
                            : "N/A"}
                        </span>{" "}
                        <span className="text-1xl">( Quantity )</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-[49%] max-[622px]:w-[100%] border-l rounded-xl shadow-md p-8 bg-red-100/70">
                    {CardData && CardData[1] ? (
                      <>
                        {" "}
                        <div className="w-24 object-fill h-20  mb-2">
                          <img
                            src={imageForSales}
                            className="w-[72%]"
                            alt="image is not found"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-[20px]">
                            Total Sales
                          </h3>
                          <div className="">
                            <span className="text-green-600 font-bold text-[22px]">
                              {" "}
                              {CardData && CardData[1]
                                ? CardData[1].totalSales
                                : "N/A"}
                            </span>{" "}
                            <span className="text-1xl">( Quantity )</span>
                          </div>
                        </div>{" "}
                      </>
                    ) : null}
                  </div>{" "}
                </>
              ) : null}
            </div>
            <div>
              {chartData ? (
                <HighchartsReact highcharts={Highcharts} options={options} />
              ) : (
                <div className="flex justify-center items-center text-amber-600 text-2xl border-1 border p-10">
                  Purchase & Sales Data is not available
                </div>
              )}
            </div>
            <div className="w-full mt-7 flex flex-wrap justify-between">
              {ShopData.map((shop) => (
                <div
                  key={shop._id}
                  className="mb-7 w-[49%] max-[622px]:w-[100%] bg-white p-4 border"
                >
                  <div>
                    <h2 className="text-2xl mb-4">
                      Shop Name: <span className="underline"><Link to={'/admin/setting/shop'}>{shop.shopName}</Link></span>
                    </h2>
                  </div>
                  {shop.product && shop.product.length > 0 ? (
                    <DataTable
                      className="mt-3"
                      value={shop.product}
                      tableStyle={{ minWidth: "50rem" }}
                      paginator
                      rows={5}
                      rowsPerPageOptions={[5, 10, 25, 50]}
                      scrollHeight="580px"
                    >
                      <Column
                        field="category.categoryName"
                        header="Category Name"
                        sortable
                        style={{ width: "10%" }}
                      />
                      <Column
                        field="subCategories.name"
                        header="Sub Categories"
                        sortable
                        style={{ width: "10%" }}
                      />
                      <Column
                        field="ml.ml"
                        header="ML"
                        style={{ width: "10%" }}
                        sortable
                        />
                      <Column
                        field="shopQuntity"
                        header="Shop Quantity"
                        sortable
                        style={{ width: "10%" }}
                      />
                    </DataTable>
                  ) : (
                    <div className="text-center">Data not found</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashbord;
