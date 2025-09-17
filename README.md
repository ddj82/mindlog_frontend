# 🌟 MindLog Frontend

감정을 기록하고 분석하는 개인 일기 웹 애플리케이션의 프론트엔드

## 📋 프로젝트 소개

**MindLog**는 일상의 감정을 기록하고 시각적으로 분석할 수 있는 감정 일기 애플리케이션입니다. 사용자가 매일의 감정을 쉽게 기록하고, 캘린더와 통계를 통해 감정 패턴을 파악할 수 있도록 도와줍니다.

## 🛠️ 기술 스택

- **React 19.0.0** - 사용자 인터페이스 구축
- **TypeScript** - 타입 안전한 개발
- **Vite** - 빠른 빌드 도구
- **Zustand** - 경량 상태 관리
- **TailwindCSS** - 유틸리티 우선 CSS 프레임워크
- **React Router Dom** - 클라이언트 사이드 라우팅
- **Axios** - HTTP 클라이언트
- **Framer Motion** - 애니메이션 라이브러리
- **React Calendar** - 캘린더 컴포넌트
- **Lucide React** - 아이콘 라이브러리

## 🚀 주요 기능

### 🔐 인증 시스템
- 회원가입 / 로그인 / 로그아웃
- JWT 토큰 기반 인증
- 자동 로그아웃 기능

### 📝 감정 일기
- 다양한 감정 선택 및 기록
- 일기 작성, 수정, 삭제
- 날짜별 감정 데이터 관리

### 📅 감정 캘린더
- 캘린더 뷰로 감정 기록 확인
- 월별 감정 패턴 시각화
- 날짜 클릭으로 해당일 일기 조회

### 📊 통계 및 분석
- 감정별 통계 데이터
- 주간/월간 감정 트렌드
- 시각적 데이터 표현

### 🎨 사용자 경험
- 다크/라이트 테마 지원
- 반응형 디자인
- 부드러운 애니메이션 효과
- 한국어 커스텀 폰트 지원

## 📁 프로젝트 구조

```none
src/
├── api/                   # API 통신 모듈
│   ├── api.ts             ## 기본 API 설정
│   └── authApi.ts         ## 인증 관련 API
├── components/            # 재사용 가능한 컴포넌트
│   ├── common/            ## 공통 컴포넌트
│   │   └── Header.tsx
│   └── emotion/           ## 감정 관련 컴포넌트
│       ├── EmotionForm.tsx
│       └── EmotionSelector.tsx
├── pages/                # 페이지 컴포넌트
│   ├── Home.tsx          ## 홈 페이지
│   ├── Login.tsx         ## 로그인 페이지
│   ├── Register.tsx      ## 회원가입 페이지
│   ├── Diary.tsx         ## 일기 페이지
│   ├── EmotionCalendar.tsx ## 감정 캘린더
│   ├── Stats.tsx         ## 통계 페이지
│   └── MyPage.tsx        ## 마이 페이지
├── router/               # 라우팅 설정
│   ├── AppRouter.tsx     ## 메인 라우터
│   └── ProtectedAuthRoute.tsx ## 인증 보호 라우트
├── store/                # Zustand 상태 관리
│   ├── authStore.ts      ## 인증 상태
│   ├── emotionStore.ts   ## 감정 데이터 상태
│   └── themeStore.ts     ## 테마 상태
├── types/                # TypeScript 타입 정의
│   ├── DiaryData.ts      ## 일기 데이터 타입
│   ├── emotion.d.ts      ## 감정 타입 정의
│   ├── emotionList.ts    ## 감정 목록
│   ├── font.ts           ## 폰트 타입
│   └── StatsType.ts      ## 통계 데이터 타입
├── util/                 # 유틸리티 컴포넌트
│   ├── AccordionItem.tsx ## 아코디언 컴포넌트
│   ├── CommonAlert.tsx   ## 공통 알림
│   ├── CommonModal.tsx   ## 공통 모달
│   └── LoadingPage.tsx   ## 로딩 페이지
├── css/                  # 커스텀 CSS
├── fonts/               # 한국어 폰트 파일
└── layout/              # 레이아웃 컴포넌트
    └── Layout.tsx
```

## 🏃‍♂️ 시작하기

### 사전 요구사항
- Node.js 18 이상
- npm 또는 yarn

### 설치 및 실행

1. **저장소 클론**
   ```bash
   git clone [repository-url]
   cd mindlog_frontend
   ```

2. **의존성 설치**
   ```bash
   npm install
   # 또는
   yarn install
   ```

3. **환경 변수 설정**
   ```bash
   # .env.production 파일에 API 서버 URL 등 필요한 환경 변수 설정
   ```

4. **개발 서버 실행**
   ```bash
   npm run dev
   # 또는
   yarn dev
   ```

5. **브라우저에서 확인**
   ```
   http://localhost:5726
   ```

## 📜 스크립트

- `npm run dev` - 개발 서버 시작
- `npm run build` - 프로덕션 빌드
- `npm run preview` - 빌드된 앱 미리보기
- `npm run lint` - ESLint 실행

## 🎨 커스텀 폰트

프로젝트에는 다음 한국어 폰트가 포함되어 있습니다:
- 고운돋음체
- 마루부리체  
- 오뮤다예쁨체
- 이서윤체

## 🌐 배포

이 프로젝트는 **Netlify**를 통해 배포되도록 설정되어 있습니다.
- `netlify.toml` 파일에 배포 설정이 포함되어 있습니다.
- 자동 배포를 위해 GitHub 저장소와 연결하여 사용할 수 있습니다.

## 🤝 백엔드 연동

이 프론트엔드는 **Spring Boot** 기반의 백엔드 API와 연동됩니다:
- 백엔드 저장소: `mindlog_backend`
- JWT 토큰 기반 인증
- RESTful API 통신

## 🔧 주요 설정

### TailwindCSS 설정
- `tailwind.config.js`에 커스텀 테마 색상 정의
- 다크/라이트 모드 지원

### TypeScript 설정
- 엄격한 타입 체크 활성화
- 절대 경로 import 지원

## 📝 라이선스

이 프로젝트는 [MIT 라이선스](LICENSE) 하에 배포됩니다.

자유롭게 사용, 수정, 배포할 수 있습니다.

## 👨‍💻 개발자

**ddj82** - 초급 웹 개발자
- 주 기술 스택: Java Spring, JPA, React

---

💡 **Tip**: 감정을 꾸준히 기록하여 나만의 감정 패턴을 발견해보세요!