// src/components/Charts/SimpleScatterChart.jsx
import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SimpleScatterChart = ({ data, xAxisKey, yAxisKey }) => {
  if (!data || data.length === 0 || !xAxisKey || !yAxisKey) {
    return <p className="text-center text-gray-500">차트를 그리려면 X축과 Y축을 모두 선택해야 합니다.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey={xAxisKey} name={xAxisKey} />
        <YAxis type="number" dataKey={yAxisKey} name={yAxisKey} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        <Scatter name="Data Points" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default SimpleScatterChart;
