// src/components/DataPreview/DataPreview.jsx
import React, { useState } from "react";

const DataPreview = ({ parsedData }) => {
  const [showAll, setShowAll] = useState(false);

  // parsedData가 없거나, data 키가 없거나, headers가 없거나, 데이터가 비어있는 경우를 처리
  if (
    !parsedData ||
    !parsedData.data ||
    !parsedData.headers ||
    parsedData.data.length === 0
  ) {
    return (
      <p className="text-center text-gray-500 mt-4">
        미리보기를 생성할 데이터가 없습니다.
      </p>
    );
  }

  const { headers, data } = parsedData;
  const visibleRows = showAll ? data : data.slice(0, 5);

  return (
    <div className="w-full mt-6">
      <h3 className="text-lg font-bold mb-2 text-center">데이터 미리보기</h3>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <div style={{ maxHeight: "20rem" }} className={`overflow-y-auto`}>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {visibleRows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50">
                    {headers.map((header, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="px-6 py-2 whitespace-nowrap text-sm text-gray-700"
                      >
                        {/* row가 객체 형태일 경우를 처리 */}
                        {typeof row === "object" && row !== null
                          ? row[header]
                          : row}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {data.length > 5 && !showAll && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowAll(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded font-medium hover:bg-blue-600 transition-colors"
          >
            더 보기 ({data.length - 5}개 행 추가)
          </button>
        </div>
      )}
    </div>
  );
};

export default DataPreview;
