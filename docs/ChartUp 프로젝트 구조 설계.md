## 📁 전체 프로젝트 구조

```
ChartUp/
├── README.md
├── package.json
├── package-lock.json
├── .gitignore
├── .env.example
├── public/
│   ├── index.html
│   ├── favicon.ico
│   ├── manifest.json
│   └── assets/                  # 정적 파일 (이미지, 아이콘 등)
│       ├── images/
│       └── icons/
├── src/
│   ├── index.js                 # 애플리케이션 엔트리 포인트
│   ├── App.js                   # 메인 앱 컴포넌트
│   ├── App.css
│   ├── components/              # 재사용 가능한 컴포넌트
│   │   ├── FileUpload/
│   │   │   ├── FileUpload.jsx
│   │   │   ├── FileUpload.css
│   │   │   └── index.js
│   │   ├── Charts/
│   │   │   ├── BarChart.jsx
│   │   │   ├── LineChart.jsx
│   │   │   ├── ChartContainer.jsx
│   │   │   └── index.js
│   │   ├── DownloadButton/
│   │   │   ├── DownloadButton.jsx
│   │   │   └── index.js
│   │   └── UI/
│   │       ├── Button.jsx
│   │       ├── Alert.jsx
│   │       ├── Loading.jsx
│   │       └── index.js
│   ├── pages/                   # 페이지 컴포넌트
│   │   ├── HomePage.jsx
│   │   ├── ChartPage.jsx
│   │   └── index.js
│   ├── hooks/                   # 커스텀 훅
│   │   ├── useFileUpload.js
│   │   ├── useDataParser.js
│   │   ├── useChartGenerator.js
│   │   └── index.js
│   ├── utils/                   # 유틸리티 함수
│   │   ├── fileValidator.js
│   │   ├── dataParser.js
│   │   ├── chartHelper.js
│   │   ├── downloadHelper.js
│   │   └── index.js
│   ├── styles/                  # 전역 스타일
│   │   ├── globals.css
│   │   ├── tailwind.css
│   │   └── components.css
│   └── constants/               # 상수 정의
│       ├── chartTypes.js
│       ├── fileTypes.js
│       └── index.js
├── docs/                        # 프로젝트 문서
│   ├── 개요서_v3.md
│   ├── 기능정의서_v3.md
│   ├── 기술스펙.md
│   └── API문서.md
```

---

## 📂 주요 디렉토리별 상세 설명

### `/src/components/` - 컴포넌트 구조

#### 1. **FileUpload 컴포넌트**

```javascript
// FileUpload/FileUpload.jsx
import React from 'react';
import { useFileUpload } from '../hooks/useFileUpload';

const FileUpload = ({ onFileProcessed }) => {
  const { uploadFile, isUploading, error } = useFileUpload();
  
  return (
    <div className="file-upload-container">
      {/* 파일 업로드 UI */}
    </div>
  );
};

export default FileUpload;
```

#### 2. **Charts 컴포넌트**

```javascript
// Charts/BarChart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ChartUpBarChart = ({ data, config }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={config.xKey} />
        <YAxis />
        <Tooltip />
        <Bar dataKey={config.yKey} fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChartUpBarChart;
```

### `/src/hooks/` - 커스텀 훅

#### 주요 훅 파일들:

- **`useFileUpload.js`**: 파일 업로드 로직
- **`useDataParser.js`**: 데이터 파싱 로직
- **`useChartGenerator.js`**: 차트 생성 로직

### `/src/utils/` - 유틸리티 함수

#### 1. **fileValidator.js**

```javascript
export const validateFile = (file) => {
  const allowedTypes = ['.csv', '.xlsx', '.xls'];
  const maxSize = 10 * 1024 * 1024; // 10MB
  
  // 검증 로직
  return { isValid: true, error: null };
};
```

#### 2. **dataParser.js**

```javascript
export const parseCSV = (file) => {
  // CSV 파싱 로직
};

export const parseExcel = (file) => {
  // Excel 파싱 로직
};
```

### `/src/constants/` - 상수 정의

#### chartTypes.js

```javascript
export const CHART_TYPES = {
  BAR: 'bar',
  LINE: 'line'
};

export const CHART_CONFIGS = {
  [CHART_TYPES.BAR]: {
    component: 'BarChart',
    requiredFields: ['category', 'value']
  },
  [CHART_TYPES.LINE]: {
    component: 'LineChart',
    requiredFields: ['date', 'value']
  }
};
```

---

## 🛠️ 기술적 설정 파일들

### `package.json` - 의존성 관리

```json
{
  "name": "chartup",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "recharts": "^2.8.0",
    "html2canvas": "^1.4.1",
    "file-saver": "^2.0.5",
    "papaparse": "^5.4.1",
    "xlsx": "^0.18.5"
  },
  "devDependencies": {
    "tailwindcss": "^3.3.0",
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^4.4.0"
  }
}
```

### `.gitignore`

```
# dependencies
/node_modules
/.pnp
.pnp.js

# production
/build
/dist

# environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# misc
.DS_Store
.vscode/
.idea/
*.swp
*.swo
```

---

## 📋 개발 단계별 구현 순서

### Week 1 (8월 1주차)

1. **프로젝트 셋업 완료**
2. **FileUpload 컴포넌트** 구현
3. **기본 UI 컴포넌트** 구현

### Week 2 (8월 2주차)

1. **데이터 파싱 유틸리티** 구현
2. **useDataParser 훅** 구현
3. **에러 처리 시스템** 구현

### Week 3 (8월 3주차)

1. **Recharts 기반 차트 컴포넌트** 구현
2. **차트 자동 선택 로직** 구현
3. **차트 스타일링** 적용

### Week 4 (8월 4주차)

1. **다운로드 기능** 구현
2. **전체 통합 테스트**
3. **버그 수정 및 최적화**

---

## 🔧 코드 품질 관리

### ESLint 설정 (추후 적용)

```json
{
  "extends": ["react-app"],
  "rules": {
    "no-unused-vars": "warn",
    "no-console": "warn"
  }
}
```

### 명명 규칙

- **컴포넌트**: PascalCase (예: `FileUpload.jsx`)
- **훅**: camelCase + use 접두사 (예: `useFileUpload.js`)
- **유틸함수**: camelCase (예: `parseCSV`)
- **상수**: UPPER_SNAKE_CASE (예: `CHART_TYPES`)

---

이 구조로 GitHub에 초기 폴더들을 생성하시겠어요? 아니면 수정하고 싶은 부분이 있으신가요?