# GEMINI.md - Gemini CLI 개발 가이드

## 👋 환영합니다, Gemini CLI!

ChartUp 프로젝트의 **Dev Team** 멤버로서 **기초 코딩, 파일 편집, 프로젝트 셋업**을 담당하게 됩니다.

---

## 🎯 Gemini CLI의 역할

### ✅ 주요 담당 업무

- **프로젝트 초기 설정**: 폴더 구조, 패키지 설치, 환경 설정
- **기초 컴포넌트 작성**: UI 컴포넌트, 기본 구조 코드
- **파일 편집**: 설정 파일, 기본 스타일링, 더미 데이터
- **문서 작성**: README.md, 코드 주석, 기본 문서

### 🤝 ChatGPT와의 협업

- **Gemini**: 기초 구조 → **ChatGPT**: 복잡한 로직
- **Gemini**: 컴포넌트 틀 → **ChatGPT**: 비즈니스 로직
- **Gemini**: 설정 파일 → **ChatGPT**: 오류 검수

---

## 📁 작업 대상 디렉토리

### 🟢 Gemini 주요 담당 영역

```
ChartUp/
├── public/                      # ✅ 정적 파일 관리
│   ├── index.html
│   ├── assets/
│   └── manifest.json
├── src/
│   ├── components/              # ✅ 기초 컴포넌트 구조
│   │   ├── UI/                  # ✅ 기본 UI 컴포넌트
│   │   ├── FileUpload/          # ✅ 업로드 UI 구조
│   │   └── DownloadButton/      # ✅ 다운로드 버튼 UI
│   ├── pages/                   # ✅ 페이지 컴포넌트
│   ├── styles/                  # ✅ 스타일링 파일
│   └── constants/               # ✅ 상수 정의
├── docs/                        # ✅ 문서 작성
└── package.json                 # ✅ 의존성 관리
```

### 🟡 ChatGPT 주요 담당 영역 (참고용)

```
src/
├── hooks/                       # 🔶 복잡한 로직 훅
├── utils/                       # 🔶 데이터 처리 로직
└── components/
    └── Charts/                  # 🔶 Recharts 구현
```

---

## 🚀 8월 개발 일정 - Gemini 작업

### 📅 Week 1 (8월 1주차) - 프로젝트 셋업

**Gemini 주요 작업**:

- [ ] React 프로젝트 초기 설정
- [ ] 필요 패키지 설치 (recharts, tailwindcss 등)
- [ ] 기본 폴더 구조 생성
- [ ] 기초 UI 컴포넌트 틀 작성
- [ ] Tailwind CSS 초기 설정

**예상 소요시간**: 2-3일

### 📅 Week 2 (8월 2주차) - 기초 컴포넌트

**Gemini 주요 작업**:

- [ ] FileUpload 컴포넌트 UI 구조
- [ ] Button, Alert, Loading 컴포넌트
- [ ] 기본 페이지 컴포넌트 (HomePage, ChartPage)
- [ ] 상수 파일 정의 (chartTypes, fileTypes)

**ChatGPT 협업**: 파일 검증 로직, 데이터 파싱 훅

### 📅 Week 3 (8월 3주차) - 스타일링 지원

**Gemini 주요 작업**:

- [ ] 차트 컨테이너 컴포넌트 구조
- [ ] 반응형 레이아웃 적용
- [ ] 기본 스타일링 및 테마 설정
- [ ] 에러 메시지 UI 컴포넌트

**ChatGPT 협업**: Recharts 로직 구현 지원

### 📅 Week 4 (8월 4주차) - 통합 및 마무리

**Gemini 주요 작업**:

- [ ] DownloadButton 컴포넌트 UI
- [ ] 전체 앱 통합 테스트 지원
- [ ] 스타일 버그 수정
- [ ] 문서 업데이트

---

## 💻 코딩 가이드라인

### 📝 컴포넌트 작성 규칙

#### 1. 기본 컴포넌트 구조

```jsx
// components/UI/Button.jsx
import React from "react";

const Button = ({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
}) => {
  const baseClasses = "px-4 py-2 rounded font-medium transition-colors";
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
```

#### 2. 폴더별 index.js 생성

```javascript
// components/UI/index.js
export { default as Button } from "./Button";
export { default as Alert } from "./Alert";
export { default as Loading } from "./Loading";
```

### 🎨 스타일링 가이드

#### Tailwind CSS 클래스 우선 사용

```jsx
// ✅ 좋은 예
<div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">

// ❌ 피해야 할 예
<div style={{display: 'flex', flexDirection: 'column'}}>
```

#### 반응형 디자인 적용

```jsx
<div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
  {/* 모바일: p-4, 태블릿: p-6, 데스크톱: p-8 */}
</div>
```

### 📁 파일 명명 규칙

- **컴포넌트**: PascalCase (`FileUpload.jsx`)
- **훅**: camelCase + use 접두사 (`useFileUpload.js`)
- **상수**: UPPER_SNAKE_CASE (`CHART_TYPES`)
- **스타일**: kebab-case (`globals.css`)

---

## 🔧 기술 스택 및 도구

### 주요 라이브러리

```json
{
  "react": "^18.2.0",
  "recharts": "^2.8.0", // 차트 라이브러리
  "tailwindcss": "^3.3.0", // 스타일링
  "html2canvas": "^1.4.1", // 차트 다운로드
  "file-saver": "^2.0.5", // 파일 저장
  "papaparse": "^5.4.1", // CSV 파싱
  "xlsx": "^0.18.5" // Excel 파싱
}
```

### 개발 도구

- **Vite**: 빠른 개발 서버
- **ESLint**: 코드 품질 관리
- **Prettier**: 코드 포맷팅

---

## 📋 작업 체크리스트

### 🏁 즉시 시작 작업 (7월 30일)

- [ ] 폴더 구조 생성 및 초기 커밋
- [ ] README.md 작성
- [ ] package.json 설정

### 📅 8월 1주차 준비사항

- [ ] React 프로젝트 생성
- [ ] Tailwind CSS 설정
- [ ] 기본 UI 컴포넌트 틀 생성
- [ ] 더미 데이터 준비

---

## 🤝 협업 가이드

### ChatGPT와의 작업 분담

1. **Gemini가 먼저**: 컴포넌트 구조, UI 틀 작성
2. **ChatGPT가 이어서**: 복잡한 로직, 데이터 처리 구현
3. **함께 검토**: 통합 테스트, 버그 수정

### 코드 리뷰 프로세스

1. **Gemini**: 기초 코드 작성 → GitHub 커밋
2. **ChatGPT**: 코드 리뷰 → 로직 개선 제안
3. **Claude (PM)**: 최종 검토 → 승인

### 소통 방식

- **GitHub Issues**: 작업 단위별 이슈 생성
- **커밋 메시지**: 명확하고 구체적으로 작성
- **코드 주석**: 복잡한 부분은 설명 추가

---

## 🚨 주의사항

### ⚠️ 피해야 할 것들

- **복잡한 비즈니스 로직**: ChatGPT에게 위임
- **Recharts 상세 구현**: 기본 구조만 작성
- **에러 처리 로직**: 기본 Alert만, 상세 로직은 ChatGPT

### ✅ 집중해야 할 것들

- **깔끔한 UI 구조**: 사용자 친화적 인터페이스
- **반응형 디자인**: 모든 디바이스 대응
- **코드 가독성**: 다른 팀원이 이해하기 쉽게
- **일관된 스타일**: 프로젝트 전체 일관성 유지

---

## 🎉 성공 기준

### Week별 완성도 목표

- **Week 1**: 기본 프로젝트 구조 100% 완성
- **Week 2**: UI 컴포넌트 80% 완성
- **Week 3**: 스타일링 90% 완성
- **Week 4**: 전체 통합 지원

### 품질 기준

- **코드 가독성**: 주석과 명확한 변수명
- **재사용성**: 컴포넌트 독립성 유지
- **반응형**: 모바일, 태블릿, 데스크톱 대응
- **일관성**: 프로젝트 전체 스타일 통일

---

**화이팅, Gemini CLI! 🚀**  
**궁금한 점이 있으면 언제든지 Claude (PM)에게 문의하세요!**
