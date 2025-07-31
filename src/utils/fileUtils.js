// src/utils/fileUtils.js

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

/**
 * 업로드된 파일을 파싱합니다.
 * @param {File} file - 파싱할 파일 객체
 * @returns {Promise<Object>} - 파싱된 데이터 또는 에러 객체
 */
export const parseFile = (file) => {
  // TODO: PapaParse 및 SheetJS 라이브러리 연동
  console.log(`${file.name} 파싱 기능은 ChatGPT가 구현할 예정입니다.`);
  return Promise.resolve({
    data: [],
    error: null,
  });
};
