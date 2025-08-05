// src/components/FileUpload/FileUpload.jsx
import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import useFileUpload from "../../hooks/useFileUpload";
import DataPreview from "../DataPreview/DataPreview";
import SimpleBarChart from "../Charts/SimpleBarChart";
import SimplePieChart from "../Charts/SimplePieChart";
import SimpleLineChart from "../Charts/SimpleLineChart";
import SimpleScatterChart from "../Charts/SimpleScatterChart";
import SimpleAreaChart from "../Charts/SimpleAreaChart";
import ChartOptions from "../Charts/ChartOptions";
import logo from "../../../public/assets/logo-removeBg.png"; // 로고 이미지 경로
import { FaGithub } from "react-icons/fa";
import { SiVelog } from "react-icons/si";
import { MdEmail } from "react-icons/md";

const FileUpload = () => {
  const {
    file,
    uploadStatus,
    parsedData,
    isDragging,
    handleFileChange,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    resetUpload,
  } = useFileUpload();
  const [activeTab, setActiveTab] = useState("data"); // 'data' or 'chart'
  const [chartOptions, setChartOptions] = useState({
    chartType: "bar",
    xAxis: "",
    yAxis: "",
  });
  const chartRef = useRef(null);

  const handleGenerateChart = (options) => {
    setChartOptions(options);
    setActiveTab("chart"); // 차트 생성 후 차트 탭으로 이동
  };

  const handleDownloadChart = () => {
    if (chartRef.current) {
      html2canvas(chartRef.current).then((canvas) => {
        saveAs(canvas.toDataURL("image/png"), `chart-${Date.now()}.png`);
      });
    }
  };

  const handleReset = () => {
    resetUpload();
    setActiveTab("data"); // 파일 초기화 후 데이터 탭으로 이동
  };

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      {/* Left Panel: File Upload Area */}
      <div
        className={`w-1/3 bg-gray-100 flex flex-col items-center justify-between border-r border-gray-200 
          ${isDragging ? "border-blue-500 bg-blue-50" : ""}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center flex-grow w-full p-8">
          <div className="flex flex-col items-center p-8">
            <h2 className="mt-12 text-3xl font-bold mb-6 text-gray-800 text-center">
              ChartUp
            </h2>
            <p className="text-lg text-gray-600 text-center">
              파일을 끌어다 놓거나 클릭하여 업로드하세요.
            </p>
          </div>
          <label
            htmlFor="file-upload"
            className={`cursor-pointer px-8 py-4 rounded-full font-bold text-white transition-colors 
          ${
            uploadStatus === "validating" || uploadStatus === "parsing"
              ? "bg-gray-400"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          >
            파일 선택
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              disabled={
                uploadStatus === "validating" || uploadStatus === "parsing"
              }
              accept=".csv, .xlsx, .xls"
              className="hidden"
            />
          </label>
          {file && (
            <div className="text-center mt-6 p-4 bg-white rounded-lg shadow-md w-full max-w-xs">
              <p className="font-medium text-gray-800">
                선택된 파일: {file.name}
              </p>
              <p className="text-sm text-gray-600">상태: {uploadStatus}</p>
            </div>
          )}
          {uploadStatus === "error" && (
            <div className="text-red-600 font-semibold mt-4 p-4 bg-red-100 rounded-md w-full max-w-xs text-center">
              ❌ 오류 발생! 파일을 다시 선택해주세요.
            </div>
          )}
          {file && (
            <button
              onClick={handleReset}
              className="mt-6 px-6 py-3 bg-gray-300 text-gray-800 rounded-full font-bold hover:bg-gray-400 transition-colors"
            >
              다른 파일 선택
            </button>
          )}
        </div>

        <div className="bg-gray-200 w-full text-center text-gray-700 text-sm p-4 flex flex-col items-center">
          <div className="flex space-x-4 mb-2">
            <a
              href="https://github.com/sins42k"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="w-8 h-8 text-gray-700 hover:text-gray-900 transition-colors" />
            </a>
            <a
              href="https://velog.io/@sins42k/posts"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiVelog className="w-8 h-8 text-gray-700 hover:text-gray-900 transition-colors" />
            </a>
            <a href="mailto:sins88705@gmail.com">
              <MdEmail className="w-8 h-8 text-gray-700 hover:text-gray-900 transition-colors" />
            </a>

            <img src={logo} className="w-8 h-8" />
          </div>

          <p>&copy; 2025 ChartUp. All rights reserved.</p>
        </div>
      </div>

      {/* Right Panel: Data Preview & Chart Area (Tabbed) */}
      <div className="w-2/3 bg-gray-100 p-8 flex flex-col">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-4">
          <button
            className={`py-2 px-4 text-lg font-medium ${
              activeTab === "data"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("data")}
          >
            데이터 미리보기
          </button>
          <button
            className={`py-2 px-4 text-lg font-medium ${
              activeTab === "chart"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            } ${
              uploadStatus !== "success" ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => uploadStatus === "success" && setActiveTab("chart")}
            disabled={uploadStatus !== "success"}
          >
            차트 생성
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-grow overflow-y-auto">
          {activeTab === "data" && (
            <div className="h-full">
              {uploadStatus === "success" ? (
                <DataPreview parsedData={parsedData} />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-50 rounded-md">
                  <p className="text-gray-500 text-center">
                    파일을 업로드하면 여기에
                    <br />
                    데이터 미리보기가 표시됩니다.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "chart" && uploadStatus === "success" && (
            <div className="h-full flex flex-col">
              <ChartOptions
                parsedData={parsedData}
                onChartGenerate={handleGenerateChart}
              />

              {chartOptions.chartType && (
                <div className="mt-2 flex-grow flex flex-col items-center justify-center bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-bold text-center mb-4">
                    생성된 차트
                  </h4>
                  <div
                    ref={chartRef}
                    className="w-full h-full flex items-center justify-center"
                  >
                    {(() => {
                      switch (chartOptions.chartType) {
                        case "bar":
                          return (
                            <SimpleBarChart
                              data={parsedData?.data}
                              xAxisKey={chartOptions.xAxis}
                              yAxisKey={chartOptions.yAxis}
                            />
                          );
                        case "pie":
                          return (
                            <SimplePieChart
                              data={parsedData?.data}
                              nameKey={chartOptions.xAxis}
                              dataKey={chartOptions.yAxis}
                            />
                          );
                        case "line":
                          return (
                            <SimpleLineChart
                              data={parsedData?.data}
                              xAxisKey={chartOptions.xAxis}
                              yAxisKey={chartOptions.yAxis}
                            />
                          );
                        case "area":
                          return (
                            <SimpleAreaChart
                              data={parsedData?.data}
                              xAxisKey={chartOptions.xAxis}
                              yAxisKey={chartOptions.yAxis}
                            />
                          );
                        case "scatter":
                          return (
                            <SimpleScatterChart
                              data={parsedData?.data}
                              xAxisKey={chartOptions.xAxis}
                              yAxisKey={chartOptions.yAxis}
                            />
                          );
                        default:
                          return null;
                      }
                    })()}
                  </div>
                  <div className="text-center mt-4">
                    <button
                      onClick={handleDownloadChart}
                      className="px-6 py-2 bg-blue-500 text-white rounded font-bold hover:bg-blue-600 transition-colors"
                    >
                      이미지로 저장
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "chart" && uploadStatus !== "success" && (
            <div className="flex items-center justify-center h-full bg-gray-50 rounded-md">
              <p className="text-gray-500 text-center">
                파일을 업로드해야 차트를 생성할 수 있습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
