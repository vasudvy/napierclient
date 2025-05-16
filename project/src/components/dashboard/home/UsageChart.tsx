import React from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  Filler 
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Card from '../../ui/Card';
import { DailyStats } from '../../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface UsageChartProps {
  dailyStats: DailyStats[];
  isLoading: boolean;
}

const UsageChart: React.FC<UsageChartProps> = ({ dailyStats, isLoading }) => {
  const labels = dailyStats.map(stat => stat.date);
  const callsData = dailyStats.map(stat => stat.calls);
  const minutesData = dailyStats.map(stat => stat.minutes);
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Calls',
        data: callsData,
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y',
      },
      {
        label: 'Minutes',
        data: minutesData,
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y1',
      },
    ],
  };
  
  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Calls',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Minutes',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };
  
  return (
    <Card 
      title="Usage Trends"
      subtitle="Call volume and minutes used over time"
      isLoading={isLoading}
      className="mt-6"
    >
      <div className="h-80">
        <Line data={data} options={options} />
      </div>
    </Card>
  );
};

export default UsageChart;