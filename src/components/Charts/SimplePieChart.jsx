// src/components/Charts/SimplePieChart.jsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// 각 섹션에 다른 색상을 부여하기 위한 컬러 배열
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919'];

const SimplePieChart = ({ data, nameKey, dataKey }) => {
  if (!data || data.length === 0 || !nameKey || !dataKey) {
    return <p className="text-center text-gray-500">차트를 그리려면 이름과 값으로 사용할 축을 모두 선택해야 합니다.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={150}
          fill="#8884d8"
          dataKey={dataKey} // Y축 (값)
          nameKey={nameKey}   // X축 (카테고리)
          label={(entry) => `${entry[nameKey]} (${entry[dataKey]})`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default SimplePieChart;
