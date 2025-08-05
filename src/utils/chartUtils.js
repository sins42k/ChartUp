// src/utils/chartUtils.js

/**
 * 데이터의 특성을 분석하여 가장 적합한 차트 유형을 추천합니다.
 * @param {{numericColumns: string[], categoricalColumns: string[]}} columnsInfo - 숫자형 및 문자열 컬럼 정보
 * @returns {string} - 추천하는 차트 유형 ('bar', 'pie', 'line', 'area', 'scatter')
 */
export const suggestChartType = (columnsInfo) => {
  const { numericColumns, categoricalColumns } = columnsInfo;
  const numericCount = numericColumns.length;
  const categoricalCount = categoricalColumns.length;

  // 1. 분산형 차트: 숫자형 컬럼이 2개 이상일 때 가장 적합
  if (numericCount >= 2) {
    return 'scatter';
  }

  // 2. 꺾은선/영역 차트: 카테고리(문자열) 컬럼이 1개, 숫자형 컬럼이 1개 이상일 때
  //    (여기서는 날짜형 데이터가 문자열로 취급되므로, 이 조건으로 시간 기반 데이터를 추정)
  if (categoricalCount >= 1 && numericCount >= 1) {
    // 간단한 추론: 컬럼명에 'date', 'time', '월', '년', '일' 등이 포함되면 line 추천
    const dateLikeColumn = categoricalColumns.find(col => 
      /date|time|월|년|일/i.test(col)
    );
    if (dateLikeColumn) {
      return 'line';
    }
    // 그렇지 않으면 막대 그래프가 일반적
    return 'bar';
  }
  
  // 3. 막대/원 그래프: 카테고리 컬럼 1개, 숫자 컬럼 1개일 때
  if (categoricalCount === 1 && numericCount === 1) {
    return 'bar';
  }

  // 4. 기본값: 위 조건에 모두 해당하지 않으면 막대 그래프를 기본으로 추천
  return 'bar';
};
