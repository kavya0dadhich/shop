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
} from "../share/dependencies";
function Dashbord() {
  const [dates, setDates] = useState([
    moment().toDate(),
    moment().subtract(1, "month").toDate(),
  ]);
  const [chartDataP, setChartDataP] = useState([]);
  const [chartDataS, setChartDataS] = useState([]);
  const [QforP, setQforP] = useState();
  const [QforS, setQforS] = useState();

  
  
useEffect(() => {
  if (chartDataP.length > 0) {
    var data = chartDataP.map((ele)=>{
      console.log(ele);
      return ele._id.quantity
    })
    setQforS(data);
  }
}, [chartDataP]);

useEffect(() => {
  if (chartDataS.length > 0) {
    var data = chartDataS.map((ele)=>{
      console.log(ele);
      return ele.totalQuantity
    })
    setQforP(data);
  }
}, [chartDataS]);
  console.log(QforP, QforS);
  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Chart for Purchase and Sales quantity",
      align: "right",
    },
    // subtitle: {
    //     text:
    //         'Source: <a target="_blank" ' +
    //         'href="https://www.indexmundi.com/agriculture/?commodity=corn">indexmundi</a>',
    //     align: 'left'
    // },
    xAxis: {
      // categories: ["USA", "China", "Brazil", "EU", "Argentina", "India"],
      // crosshair: true,
      // accessibility: {
      //     description: 'Countries'
      // }
      categories: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
        'Oct', 'Nov', 'Dec'
    ]
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
        data: QforP,
      },
      {
        name: "Sales",
        data: QforS,
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
      endDate: moment(value[1]).format("MM/DD/YYYY")
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(date),
    };
    fetch("http://localhost:3000/dashboard", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if(data.result){
          setChartDataP(data.result[0])
          setChartDataS(data.result[1])
        }

        console.log(data);
      });
  }
  console.log(dates);
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
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashbord;
