// src/hooks/useFileUpload.js
import { useState, useCallback } from "react";
import { validateFile, parseFile } from "../utils/fileUtils";

/**
 * 파일 업로드 및 처리 관련 로직을 담당하는 커스텀 훅
 * @returns {{file: File | null, setFile: Function, uploadStatus: string, parsedData: any, handleFileChange: Function, resetUpload: Function}}
 */
const useFileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, validating, parsing, success, error
  const [parsedData, setParsedData] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = useCallback(async (selectedFile) => {
    if (!selectedFile) return;

    setUploadStatus('validating');
    if (!validateFile(selectedFile)) {
      setUploadStatus('error');
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setUploadStatus('parsing');

    try {
      const result = await parseFile(selectedFile);
      if (result.error) {
        throw new Error(result.error);
      }
      setParsedData(result);
      setUploadStatus('success');
    } catch (err) {
      console.error('파일 파싱 오류:', err);
      alert('파일을 처리하는 중 오류가 발생했습니다.');
      setUploadStatus('error');
      setFile(null);
    }
  }, []);

  const handleFileChange = useCallback((event) => {
    processFile(event.target.files[0]);
  }, [processFile]);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    processFile(e.dataTransfer.files[0]);
  }, [processFile]);

  const resetUpload = useCallback(() => {
    setFile(null);
    setUploadStatus('idle');
    setParsedData(null);
  }, []);

  return {
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
  };
};

export default useFileUpload;
