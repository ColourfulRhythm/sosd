import { arrowUp } from '@/public/assets/icon';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
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
import Image from 'next/image';

const IncomeGraph = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };
  const labels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [1, 2, 3, 6],
        borderColor: '#00B068',
        backgroundColor: '#f4f4f4',
      },
    ],
  };

  return (
    <div>
      <div className="graph">
        <div className="income">
          <p className="income-text">Income Graph</p>
          <div className="calendar">
            <div className="week">
              <p>Week 1</p>
              <Image src={arrowUp} alt="arrow" />
            </div>
            <div className="month">
              <FiChevronLeft />
              <h4>Aug 2021</h4>
              <FiChevronRight />
            </div>
          </div>
        </div>
        <div className="lineGraph">
          <Line options={options} data={data} height={90} />
        </div>
      </div>
    </div>
  );
};

export default IncomeGraph;
