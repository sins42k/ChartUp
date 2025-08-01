// src/components/FileUpload/FileUpload.jsx
import React from "react";
import useFileUpload from "../../hooks/useFileUpload";
import DataPreview from "../DataPreview/DataPreview";

const FileUpload = () => {
  const { file, uploadStatus, parsedData, handleFileChange, resetUpload } =
    useFileUpload();

  return (
    <div className="w-full max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        파일 업로드 및 데이터 미리보기
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Side: File Upload Controls */}
        <div className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-lg h-full space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">1. 파일 선택</h3>
          <input
            type="file"
            onChange={handleFileChange}
            disabled={
              uploadStatus === "validating" || uploadStatus === "parsing"
            }
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50 cursor-pointer"
            accept=".csv, .xlsx, .xls"
          />

          {file && (
            <div className="text-center p-4 bg-gray-50 rounded-md w-full">
              <p className="font-medium text-gray-800">
                선택된 파일: {file.name}
              </p>
              <p className="text-sm text-gray-600">상태: {uploadStatus}</p>
            </div>
          )}

          {uploadStatus === "error" && (
            <div className="text-red-600 font-semibold p-4 bg-red-50 rounded-md w-full text-center">
              ❌ 오류 발생! 파일을 다시 선택해주세요.
            </div>
          )}

          {file && (
            <button
              onClick={resetUpload}
              className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded font-medium hover:bg-gray-300 transition-colors"
            >
              다른 파일 선택
            </button>
          )}
        </div>

        {/* Right Side: Data Preview */}
        <div className="p-6 border border-gray-200 rounded-lg min-h-[28rem] flex justify-center flex-col">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            2. 데이터 확인
          </h3>
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
      </div>
    </div>
  );
};

export default FileUpload;
