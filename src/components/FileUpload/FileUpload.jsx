// src/components/FileUpload/FileUpload.jsx
import React from 'react';
import useFileUpload from '../../hooks/useFileUpload';

const FileUpload = () => {
  const { file, uploadStatus, handleFileChange, resetUpload } = useFileUpload();

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">파일 업로드</h2>
      
      <div className="flex flex-col items-center space-y-4">
        <input 
          type="file" 
          onChange={handleFileChange}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          accept=".csv, .xlsx, .xls"
        />

        {file && (
          <div className="text-center">
            <p className="font-medium">선택된 파일: {file.name}</p>
            <p className="text-sm text-gray-500">상태: {uploadStatus}</p>
          </div>
        )}

        {uploadStatus === 'success' && (
          <div className="text-green-600 font-semibold">
            ✅ 파일 처리 완료!
          </div>
        )}

        {uploadStatus === 'error' && (
          <div className="text-red-600 font-semibold">
            ❌ 오류 발생! 파일을 다시 선택해주세요.
          </div>
        )}

        {(file) && (
          <button 
            onClick={resetUpload}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded font-medium hover:bg-gray-300"
          >
            다른 파일 선택
          </button>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
