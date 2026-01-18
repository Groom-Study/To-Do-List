const express = require('express');
const cors = require('cors');
require('dotenv').config();

const scheduleRoutes = require('./routes/schedule.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 루트 라우트
app.get('/', (req, res) => {
  res.json({
    message: 'Todo List API Server',
    version: '1.0.0',
    endpoints: {
      schedules: '/api/schedules'
    }
  });
});

// API 라우트
app.use('/api/schedules', scheduleRoutes);

// 404 에러 핸들링
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: '요청하신 경로를 찾을 수 없습니다.'
  });
});

// 전역 에러 핸들링
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: '서버 오류가 발생했습니다.',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
