// src/components/Charts/SimpleLineChart.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SimpleLineChart = ({ data, xAxisKey, yAxisKey }) => {
  if (!data || data.length === 0 || !xAxisKey || !yAxisKey) {
    return <p className="text-center text-gray-500">차트를 그리려면 X축과 Y축을 모두 선택해야 합니다.</p>;
  }

  // 시간에 따라 데이터 정렬 (X축 기준)
  const sortedData = [...data].sort((a, b) => new Date(a[xAxisKey]) - new Date(b[xAxisKey]));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={sortedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={yAxisKey} stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SimpleLineChart;
