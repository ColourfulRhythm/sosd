import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as Chartjs } from 'chart.js/auto';
const AdminChart = ({ directLinkData, detailAdsData, visualAdsData }) => {
  const [chartData, setChartData] = useState({
    display: false,
    datasets: [
      {
        label: 'Adverts',
        data: [directLinkData, detailAdsData, visualAdsData],
        backgroundColor: ['#0694FA', '#FABC05', '#14A83C'],
      },
    ],
  });
  return (
    <div className="" style={{ width: 200 }}>
      <Pie data={chartData} x/>
    </div>
  );
};

export default AdminChart;
