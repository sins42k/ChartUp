// src/components/Charts/ChartOptions.jsx
import React, { useState, useMemo, useEffect } from "react";
import { suggestChartType } from "../../utils/chartUtils";

const ChartOptions = ({ parsedData, onChartGenerate }) => {
  const { headers, data } = parsedData;

  const { numericColumns, categoricalColumns } = useMemo(() => {
    const numeric = new Set();
    const categorical = new Set();
    if (data.length > 0) {
      headers.forEach((header) => {
        // 데이터의 일부를 샘플링하여 타입 추론의 정확도를 높임
        const isNumericColumn = data
          .slice(0, 10)
          .some((row) => typeof row[header] === "number");
        if (isNumericColumn) {
          numeric.add(header);
        } else {
          categorical.add(header);
        }
      });
    }
    return {
      numericColumns: Array.from(numeric),
      categoricalColumns: Array.from(categorical),
    };
  }, [headers, data]);

  const [chartType, setChartType] = useState("bar");
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");

  // 데이터가 변경될 때마다 최적의 차트 유형을 추천하고 상태를 업데이트합니다.
  useEffect(() => {
    const suggested = suggestChartType({ numericColumns, categoricalColumns });
    setChartType(suggested);
  }, [numericColumns, categoricalColumns]);

  // 차트 타입이나 축 후보가 변경될 때 X, Y축 선택지를 초기화하는 로직
  useEffect(() => {
    if (chartType === "scatter") {
      setXAxis(numericColumns[0] || "");
      setYAxis(numericColumns[1] || "");
    } else {
      setXAxis(categoricalColumns[0] || "");
      setYAxis(numericColumns[0] || "");
    }
  }, [chartType, categoricalColumns, numericColumns]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (xAxis && yAxis) {
      onChartGenerate({ chartType, xAxis, yAxis });
    }
  };

  let buttonText, xAxisLabel, yAxisLabel, xAxisOptions;

  if (chartType === "scatter") {
    xAxisLabel = "X축 (값):";
    yAxisLabel = "Y축 (값):";
    xAxisOptions = numericColumns;
  } else if (chartType === "pie") {
    xAxisLabel = "이름 (Name):";
    yAxisLabel = "값 (Value):";
    xAxisOptions = categoricalColumns;
  } else {
    xAxisLabel = "X축 (카테고리):";
    yAxisLabel = "Y축 (값):";
    xAxisOptions = categoricalColumns;
  }

  switch (chartType) {
    case "bar":
      buttonText = "막대 그래프 생성";
      break;
    case "pie":
      buttonText = "원 그래프 생성";
      break;
    case "line":
      buttonText = "꺾은선 그래프 생성";
      break;
    case "area":
      buttonText = "영역 차트 생성";
      break;
    case "scatter":
      buttonText = "분산형 차트 생성";
      break;
    default:
      buttonText = "차트 생성";
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-2 p-6 bg-white rounded-lg shadow-md border border-gray-200"
    >
      <div className="text-center">
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 p-2 bg-gray-100 rounded-md">
          <label className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-200 transition-colors">
            <input
              type="radio"
              name="chartType"
              value="bar"
              checked={chartType === "bar"}
              onChange={() => setChartType("bar")}
              className="form-radio text-blue-600"
            />
            <span className="text-gray-700 font-medium">막대 그래프</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-200 transition-colors">
            <input
              type="radio"
              name="chartType"
              value="pie"
              checked={chartType === "pie"}
              onChange={() => setChartType("pie")}
              className="form-radio text-blue-600"
            />
            <span className="text-gray-700 font-medium">원 그래프</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-200 transition-colors">
            <input
              type="radio"
              name="chartType"
              value="line"
              checked={chartType === "line"}
              onChange={() => setChartType("line")}
              className="form-radio text-blue-600"
            />
            <span className="text-gray-700 font-medium">꺾은선 그래프</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-200 transition-colors">
            <input
              type="radio"
              name="chartType"
              value="area"
              checked={chartType === "area"}
              onChange={() => setChartType("area")}
              className="form-radio text-blue-600"
            />
            <span className="text-gray-700 font-medium">영역 차트</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-200 transition-colors">
            <input
              type="radio"
              name="chartType"
              value="scatter"
              checked={chartType === "scatter"}
              onChange={() => setChartType("scatter")}
              className="form-radio text-blue-600"
            />
            <span className="text-gray-700 font-medium">분산형 차트</span>
          </label>
        </div>
      </div>

      <div className="p-2 bg-gray-100 rounded-md flex items-center justify-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-4/5">
          <div className="flex flex-col items-center gap-2">
            <label
              htmlFor="x-axis-select"
              className="font-medium text-gray-700"
            >
              {xAxisLabel}
            </label>
            <select
              id="x-axis-select"
              value={xAxis}
              onChange={(e) => setXAxis(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-48 bg-white text-gray-800 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="" disabled>
                선택하세요
              </option>
              {xAxisOptions.map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col items-center gap-2">
            <label
              htmlFor="y-axis-select"
              className="font-medium text-gray-700"
            >
              {yAxisLabel}
            </label>
            <select
              id="y-axis-select"
              value={yAxis}
              onChange={(e) => setYAxis(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-48 bg-white text-gray-800 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="" disabled>
                선택하세요
              </option>
              {numericColumns.map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-center w-1/5">
          <button
            type="submit"
            disabled={!xAxis || !yAxis}
            className="px-6 py-3 bg-green-600 text-white rounded-full font-bold text-md hover:bg-green-700 transition-colors shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChartOptions;
