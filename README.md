# Todo List Backend API

Express와 MySQL을 사용한 Todo List 백엔드 API

## 기술 스택
- Node.js
- Express.js
- MySQL
- Docker & Docker Compose

## Docker로 실행하기

###  Docker Compose로 실행
```bash
docker-compose up -d
```


## 로컬에서 직접 실행하기

### 1. 패키지 설치
```bash
npm install
```

### 2. 환경변수 설정
`.env` 파일에 MySQL 접속 정보를 입력하세요.
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=todo_db
DB_PORT=3306
```

### 3. 데이터베이스 생성
MySQL에 접속하여 `schema.sql` 파일을 실행하세요.
```bash
mysql -u root -p < schema.sql
```

### 4. 서버 실행
개발 모드:
```bash
npm run dev
```

프로덕션 모드:
```bash
npm start
```


## API 문서 (Swagger)

API 문서는 Swagger UI로 확인할 수 있습니다.

- **Swagger UI**: http://localhost:3000/api-docs


## API 엔드포인트

### 전체 일정 목록 조회
- **GET** `/api/schedules`
- **응답**: 일정 배열

### 새 일정 추가
- **POST** `/api/schedules`
- **Body**: 
  ```json
  {
    "title": "일정 제목 (1-20자)",
    "description": "일정 설명 (선택)",
    "due_date": "yyyy-mm-dd"
  }
  ```

### 일정 수정
- **PUT** `/api/schedules/:id`
- **Body**: 
  ```json
  {
    "title": "수정된 제목 (1-20자)",
    "description": "수정된 설명",
    "due_date": "yyyy-mm-dd"
  }
  ```

### 일정 완료 여부 토글
- **PATCH** `/api/schedules/:id/done`

### 일정 삭제
- **DELETE** `/api/schedules/:id`
