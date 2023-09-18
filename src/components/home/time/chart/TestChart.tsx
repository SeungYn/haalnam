'use client';
import React from 'react';
import Chart from 'react-apexcharts';
interface Task {
  startTime: string;
  endTime: string;
}

interface TaskListChartProps {
  tasks: Task[];
}

const TaskListChart: React.FC<TaskListChartProps> = ({ tasks }) => {
  const chartData = tasks.map((task) => {
    const startTime = new Date(task.startTime).getTime();
    const endTime = new Date(task.endTime).getTime();
    const duration = (endTime - startTime) / 1000;
    return {
      data: duration,
      startTime,
      endTime,
    };
  });

  const sample = {
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  };

  const options = {
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 270,
        hollow: {
          size: '70%',
        },
        track: {
          background: '#f2f2f2',
          strokeWidth: '100%',
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
      },
    },
    annotations: {
      points: chartData.map((task, index) => ({
        x: index,
        y: 50,
        marker: {
          size: 8,
          fillColor: taskColor(task.startTime, task.endTime),
          radius: 2,
        },
      })),
      yaxis: [
        {
          y: 50,
          borderColor: '#333',
          borderWidth: 1,
        },
      ],
      xaxis: [
        {
          x: 0,
          borderColor: 'transparent',
        },
      ],
    },
    chart: {
      id: 'task-list-chart',
    },
  };

  function taskColor(startTime: number, endTime: number): string {
    const currentTime = new Date().getTime();
    if (currentTime >= startTime && currentTime <= endTime) {
      return '#3498db';
    }
    return '#2ecc71';
  }

  return (
    <div>
      <Chart
        options={sample.options as ApexCharts.ApexOptions}
        series={sample.series}
        type='pie'
        width='400'
      />
    </div>
  );
};

export default TaskListChart;
