// src/components/FileUpload/FileUpload.jsx
import React, { useState } from "react";
import useFileUpload from "../../hooks/useFileUpload";
import DataPreview from "../DataPreview/DataPreview";
import SimpleBarChart from "../Charts/SimpleBarChart";
import SimplePieChart from '../Charts/SimplePieChart';
import ChartOptions from '../Charts/ChartOptions';

const FileUpload = () => {
  const { file, uploadStatus, parsedData, handleFileChange, resetUpload } =
    useFileUpload();
  const [showChart, setShowChart] = useState(false);
  const [chartOptions, setChartOptions] = useState({ chartType: 'bar', xAxis: '', yAxis: '' });

  const handleGenerateChart = (options) => {
    setChartOptions(options);
    setShowChart(true);
  };

  const handleReset = () => {
    resetUpload();
    setShowChart(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      <div className="bg-white rounded-lg shadow-2xl p-8 mb-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          1. 파일 업로드 및 데이터 확인
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Side: File Upload Controls */}
          <div className="flex flex-col p-6 border border-gray-200 rounded-lg space-y-4 min-h-[28rem]">
            <h3 className="text-xl font-semibold text-gray-700">파일 선택</h3>
            <input
              type="file"
              onChange={handleFileChange}
              disabled={uploadStatus === 'validating' || uploadStatus === 'parsing'}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50 cursor-pointer"
              accept=".csv, .xlsx, .xls"
            />
            {file && (
              <div className="text-center p-4 bg-gray-50 rounded-md w-full">
                <p className="font-medium text-gray-800">선택된 파일: {file.name}</p>
                <p className="text-sm text-gray-600">상태: {uploadStatus}</p>
              </div>
            )}
            {uploadStatus === 'error' && (
              <div className="text-red-600 font-semibold p-4 bg-red-50 rounded-md w-full text-center">
                ❌ 오류 발생! 파일을 다시 선택해주세요.
              </div>
            )}
            {file && (
              <button
                onClick={handleReset}
                className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded font-medium hover:bg-gray-300 transition-colors"
              >
                다른 파일 선택
              </button>
            )}
          </div>

          {/* Right Side: Data Preview */}
          <div className="p-6 border border-gray-200 rounded-lg min-h-[28rem]">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
              데이터 미리보기
            </h3>
            {uploadStatus === 'success' ? (
              <DataPreview parsedData={parsedData} />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-50 rounded-md">
                <p className="text-gray-500 text-center">
                  파일을 업로드하면 여기에<br />데이터 미리보기가 표시됩니다.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {uploadStatus === 'success' && (
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">2. 차트 생성</h2>
                    <ChartOptions parsedData={parsedData} onChartGenerate={handleGenerateChart} />
          {showChart && (
            <div className="mt-6">
              {chartOptions.chartType === 'bar' ? (
                <SimpleBarChart data={parsedData?.data} xAxisKey={chartOptions.xAxis} yAxisKey={chartOptions.yAxis} />
              ) : (
                <SimplePieChart data={parsedData?.data} nameKey={chartOptions.xAxis} dataKey={chartOptions.yAxis} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
