// src/components/Charts/ChartOptions.jsx
import React, { useState, useMemo } from 'react';

const ChartOptions = ({ parsedData, onChartGenerate }) => {
  const { headers, data } = parsedData;
  
  // 데이터의 첫 행을 기준으로 숫자형/문자열 컬럼을 분류합니다.
  const { numericColumns, categoricalColumns } = useMemo(() => {
    const numeric = [];
    const categorical = [];
    if (data.length > 0) {
      const firstRow = data[0];
      headers.forEach(header => {
        if (typeof firstRow[header] === 'number') {
          numeric.push(header);
        } else {
          categorical.push(header);
        }
      });
    }
    return { numericColumns: numeric, categoricalColumns: categorical };
  }, [headers, data]);

  const [chartType, setChartType] = useState('bar'); // 'bar' or 'pie'
  const [xAxis, setXAxis] = useState(categoricalColumns[0] || '');
  const [yAxis, setYAxis] = useState(numericColumns[0] || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (xAxis && yAxis) {
      onChartGenerate({ chartType, xAxis, yAxis });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-center gap-6">
        <span className="font-medium text-gray-700">차트 종류:</span>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="chartType" value="bar" checked={chartType === 'bar'} onChange={() => setChartType('bar')} className="form-radio" />
            막대 그래프
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="chartType" value="pie" checked={chartType === 'pie'} onChange={() => setChartType('pie')} className="form-radio" />
            원 그래프
          </label>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="x-axis-select" className="font-medium text-gray-700">{chartType === 'bar' ? 'X축 (카테고리):' : '이름 (Name):'}</label>
          <select 
            id="x-axis-select"
            value={xAxis}
            onChange={(e) => setXAxis(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="" disabled>선택하세요</option>
            {categoricalColumns.map(col => <option key={col} value={col}>{col}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="y-axis-select" className="font-medium text-gray-700">{chartType === 'bar' ? 'Y축 (값):' : '값 (Value):'}</label>
          <select 
            id="y-axis-select"
            value={yAxis}
            onChange={(e) => setYAxis(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="" disabled>선택하세요</option>
            {numericColumns.map(col => <option key={col} value={col}>{col}</option>)}
          </select>
        </div>
      </div>
      <div className="text-center">
        <button 
          type="submit"
          disabled={!xAxis || !yAxis}
          className="px-6 py-2 bg-green-500 text-white rounded font-bold hover:bg-green-600 transition-colors disabled:bg-gray-400"
        >
          {chartType === 'bar' ? '막대 그래프 생성' : '원 그래프 생성'}
        </button>
      </div>
    </form>
  );
};

export default ChartOptions;
