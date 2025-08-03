// src/utils/fileUtils.js
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

/**
 * 파일의 유효성을 검사합니다. (확장자, 크기)
 * @param {File} file - 검사할 파일 객체
 * @returns {boolean} - 유효하면 true, 아니면 false
 */
export const validateFile = (file) => {
  if (!file) return false;

  const allowedExtensions = ['.csv', '.xlsx', '.xls'];
  const maxSizeInBytes = 10 * 1024 * 1024; // 10MB

  const fileName = file.name;
  const fileExtension = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();

  if (!allowedExtensions.includes(fileExtension)) {
    alert(`지원하지 않는 파일 형식입니다. (${fileExtension})`);
    return false;
  }

  if (file.size > maxSizeInBytes) {
    alert('파일 크기는 10MB를 초과할 수 없습니다.');
    return false;
  }

  return true;
};

const convertToNumber = (value) => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const num = Number(value.replace(/,/g, ''));
    if (!isNaN(num)) return num;
  }
  return value;
};

/**
 * 업로드된 파일을 파싱합니다.
 * @param {File} file - 파싱할 파일 객체
 * @returns {Promise<Object>} - 파싱된 데이터 또는 에러 객체
 */
export const parseFile = (file) => {
  return new Promise((resolve) => {
    const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();

    if (fileExtension === '.csv') {
      // CSV 파싱
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true, // 자동으로 숫자형 데이터 변환
        complete: (result) => {
          if (result.errors.length > 0) {
            resolve({ headers: [], data: [], error: 'CSV 파싱 중 오류가 발생했습니다.' });
          } else {
            const headers = result.meta.fields;
            resolve({ headers, data: result.data, error: null });
          }
        },
        error: () => {
          resolve({ headers: [], data: [], error: 'CSV 파일을 읽는 중 오류가 발생했습니다.' });
        },
      });
    } else if (fileExtension === '.xlsx' || fileExtension === '.xls') {
      // Excel 파싱
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          
          if (jsonData.length === 0) {
            resolve({ headers: [], data: [], error: 'Excel 파일이 비어있습니다.' });
            return;
          }

          const headers = jsonData[0];
          const dataRows = jsonData.slice(1).map(row => {
            const rowData = {};
            headers.forEach((header, index) => {
              rowData[header] = convertToNumber(row[index]); // 숫자형으로 변환
            });
            return rowData;
          });

          resolve({ headers, data: dataRows, error: null });
        } catch (err) {
          resolve({ headers: [], data: [], error: 'Excel 파일을 처리하는 중 오류가 발생했습니다.' });
        }
      };
      reader.onerror = () => {
        resolve({ headers: [], data: [], error: 'Excel 파일을 읽는 중 오류가 발생했습니다.' });
      };
      reader.readAsArrayBuffer(file);
    } else {
      resolve({ headers: [], data: [], error: '지원하지 않는 파일 형식입니다.' });
    }
  });
};