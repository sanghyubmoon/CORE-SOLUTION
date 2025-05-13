# CORE-SOLUTION

AI 기반 숏폼 콘텐츠 제작 및 인플루언서 추천 코어 솔루션

## 🚀 주요 기능

1. **숏폼 콘텐츠 기획**
   - OpenAI API를 활용한 콘텐츠 아이디어 생성
   - 트렌드 분석 및 키워드 추천
   - 타겟 오디언스별 맞춤 콘텐츠 제안

2. **콘티 제작**
   - 자동 시나리오 생성
   - 씬별 스토리보드 작성
   - 타임라인 및 촬영 가이드 제공

3. **인플루언서 검색 & 추천**
   - 콘텐츠 스타일 매칭
   - 팔로워 분석 및 참여율 기반 추천
   - 카테고리별 인플루언서 데이터베이스

## 💻 기술 스택

### Frontend
- React.js with TypeScript
- Next.js for SSR/SSG
- Tailwind CSS for styling
- Zustand for state management

### Backend
- Node.js with Express
- TypeScript
- Prisma ORM
- PostgreSQL

### AI/ML
- OpenAI API (GPT-4)
- Vector embeddings for similarity search

### Infrastructure
- Vercel (Frontend)
- Railway/Render (Backend)
- Supabase (Database)

## 📋 설치 가이드

1. **프로젝트 클론**
```bash
git clone https://github.com/sanghyubmoon/CORE-SOLUTION.git
cd CORE-SOLUTION
```

2. **환경 변수 설정**
```bash
cp .env.example .env
# .env 파일에 필요한 API 키와 설정 입력
```

3. **의존성 설치**
```bash
# 프로젝트 루트에서
npm install

# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

4. **데이터베이스 설정**
```bash
cd backend
npm run db:migrate
npm run db:seed
```

5. **개발 서버 실행**
```bash
# 프로젝트 루트에서
npm run dev
```

## 🔑 환경 변수

### Backend (.env)
```
# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/core_solution

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_jwt_secret

# CORS
CLIENT_URL=http://localhost:3000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
```

## 📁 프로젝트 구조

```
CORE-SOLUTION/
├── frontend/               # Next.js 프론트엔드
│   ├── src/
│   │   ├── components/    # React 컴포넌트
│   │   ├── pages/        # Next.js 페이지
│   │   ├── hooks/        # Custom hooks
│   │   ├── utils/        # 유틸리티 함수
│   │   └── styles/       # 스타일시트
│   └── public/           # 정적 파일
│
├── backend/              # Express 백엔드
│   ├── src/
│   │   ├── controllers/  # API 컨트롤러
│   │   ├── services/     # 비즈니스 로직
│   │   ├── models/       # 데이터 모델
│   │   ├── routes/       # API 라우트
│   │   └── utils/        # 유틸리티 함수
│   └── prisma/          # Prisma 스키마
│
└── shared/              # 공유 타입 및 인터페이스
```

## 🛠️ API 엔드포인트

### 콘텐츠 기획
- `POST /api/content/ideas` - 콘텐츠 아이디어 생성
- `POST /api/content/trending` - 트렌드 분석
- `GET /api/content/keywords` - 키워드 추천

### 콘티 제작
- `POST /api/storyboard/create` - 스토리보드 생성
- `GET /api/storyboard/:id` - 스토리보드 조회
- `PUT /api/storyboard/:id` - 스토리보드 수정

### 인플루언서
- `GET /api/influencers/search` - 인플루언서 검색
- `GET /api/influencers/:id` - 인플루언서 상세 정보
- `POST /api/influencers/recommend` - 인플루언서 추천

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

MIT License

## 📞 문의

- Email: sanghyubmoon@gmail.com
- GitHub: [@sanghyubmoon](https://github.com/sanghyubmoon)