// src/hooks/useFileUpload.js
import { useState, useCallback } from "react";
import { validateFile, parseFile } from "../utils/fileUtils";

/**
 * 파일 업로드 및 처리 관련 로직을 담당하는 커스텀 훅
 * @returns {{file: File | null, setFile: Function, uploadStatus: string, parsedData: any, handleFileChange: Function, resetUpload: Function}}
 */
const useFileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("idle"); // idle, validating, parsing, success, error
  const [parsedData, setParsedData] = useState(null);

  /**
   * 파일 입력 변경 시 호출되는 핸들러
   */
  const handleFileChange = useCallback(async (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    setUploadStatus("validating");
    if (!validateFile(selectedFile)) {
      setUploadStatus("error");
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setUploadStatus("parsing");

    try {
      // ChatGPT가 parseFile 함수 내부 로직을 구현할 예정
      const result = await parseFile(selectedFile);
      if (result.error) {
        throw new Error(result.error);
      }
      setParsedData(result);
      setUploadStatus("success");
    } catch (err) {
      console.error("파일 파싱 오류:", err);
      alert("파일을 처리하는 중 오류가 발생했습니다.");
      setUploadStatus("error");
      setFile(null);
    }
  }, []);

  /**
   * 업로드 상태를 초기화하는 함수
   */
  const resetUpload = useCallback(() => {
    setFile(null);
    setUploadStatus("idle");
    setParsedData(null);
  }, []);

  return {
    file,
    uploadStatus,
    parsedData,
    handleFileChange,
    resetUpload,
  };
};

export default useFileUpload;
