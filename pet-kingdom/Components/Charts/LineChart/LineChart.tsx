'use client'
import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart: React.FC = () => {
  // Generate historical data for clicks per hour and aggregate for clicks per day
  const generateHistoricalData = () => {
    let historicalClicksPerHour = Array.from({ length: 24 }, () => Math.floor(Math.random() * 10) + 50);
    let historicalClicksPerDay = historicalClicksPerHour.reduce((acc, curr) => acc + curr, 0);
    
    return {
      perHour: historicalClicksPerHour,
      perDay: new Array(24).fill(historicalClicksPerDay),
    };
  };

  const historicalData = generateHistoricalData();

  const [data, setData] = useState({
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`), // 24 hours
    datasets: [
      {
        label: 'Clicks per minute',
        data: Array.from({ length: 24 }, () => 0), // This will be populated in real-time
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Clicks per hour',
        data: historicalData.perHour,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Clicks per day',
        data: historicalData.perDay,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Clicks Statistics',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Hour of the Day'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Clicks'
        }
      }
    }
  };

  // Function to simulate new click data
  const generateClickData = () => {
    const perMinute = Math.floor(Math.random() * 5) + 1; // Simulate 1-5 clicks per minute
    return perMinute;
  };

  // Function to update the chart data
  const updateChartData = () => {
    setData(currentData => {
      const newClicksPerMinute = generateClickData();
      const newDatasets = currentData.datasets.map(dataset => {
        let newData = [...dataset.data];
        if (dataset.label === 'Clicks per minute') {
          // Shift the data and add a new value
          newData.shift();
          newData.push(newClicksPerMinute);
        } else if (dataset.label === 'Clicks per hour') {
          // Recalculate clicks per hour by summing the last 60 minutes
          const totalClicksThisHour = newData.slice(-60).reduce((acc, val) => acc + val, 0);
          newData[newData.length - 1] = totalClicksThisHour;
        } else if (dataset.label === 'Clicks per day') {
          // Add the new clicks to today's total
          newData[newData.length - 1] += newClicksPerMinute;
        }
        return { ...dataset, data: newData };
      });
      return { ...currentData, datasets: newDatasets };
    });
  };

  // Set up an interval to update the chart
  useEffect(() => {
    const interval = setInterval(updateChartData, 500);
    return () => clearInterval(interval);
  }, []);

  return <Line options={options} data={data} />;
};

export default LineChart;
