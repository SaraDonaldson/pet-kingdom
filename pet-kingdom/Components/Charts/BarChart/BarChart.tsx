// "use client";

// import React from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";
// import { faker } from "@faker-js/faker";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const BarChart: React.FC = () => {
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top" as const,
//       },
//       title: {
//         display: true,
//         text: "Bar Chart",
//       },
//     },
//   };

//   const labels = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//   ];

//   const data = {
//     labels,
//     datasets: [
//       {
//         label: "Dataset 1",
//         data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//         backgroundColor: "rgba(255, 99, 132, 0.5)",
//       },
//       {
//         label: "Dataset 2",
//         data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//         backgroundColor: "rgba(53, 162, 235, 0.5)",
//       },
//     ],
//   };

//   return <Bar options={options} data={data} />;
// };
// export default BarChart;

'use client'
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string;
}

const BarChart: React.FC = () => {
  const [data, setData] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Impressions",
        data: [],
        backgroundColor: "rgba(255, 206, 86, 0.5)",
      },
      {
        label: "Clicks",
        data: [],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "Conversions",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const
      },
      title: {
        display: true,
        text: "Advertising Statistics",
      },
    },
  };

  const updateData = () => {
    setData((currentData:any) => {
      const newData: Dataset[] = currentData.datasets.map((dataset:any) => ({
        ...dataset,
        data: currentData.labels.map(() => Math.floor(Math.random() * 1000)),
      }));
      return {
        ...currentData,
        datasets: newData,
      };
    });
  };

  useEffect(() => {
    const intervalId = setInterval(updateData, 10000); // Update every 10 seconds
      updateData()
    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return <Bar options={options} data={data} />;
};

export default BarChart;
