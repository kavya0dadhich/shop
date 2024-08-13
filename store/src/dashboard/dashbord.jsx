import admin from "../assets/admin.svg";
import { HighchartsReact, Highcharts } from "../share/dependencies";
function Dashbord() {
  let name = "Kavya";
  const options = {
    chart: {
      type: 'column'
  },
  // title: {
  //     text: 'Corn vs wheat estimated production for 2023',
  //     align: 'right'
  // },
  // subtitle: {
  //     text:
  //         'Source: <a target="_blank" ' +
  //         'href="https://www.indexmundi.com/agriculture/?commodity=corn">indexmundi</a>',
  //     align: 'left'
  // },
  xAxis: {
      categories: ['USA', 'China', 'Brazil', 'EU', 'Argentina', 'India'],
      // crosshair: true,
      // accessibility: {
      //     description: 'Countries'
      // }
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
          borderWidth: 0
      }
  },
    series: [
      {
          name: 'Corn',
          data: [387749, 280000, 129000, 64300, 54000, 34300]
      },
      {
          name: 'Wheat',
          data: [45321, 140000, 10000, 140500, 19500, 113500]
      }
  ]
  };
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
            <HighchartsReact  highcharts={Highcharts} options={options} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashbord;
