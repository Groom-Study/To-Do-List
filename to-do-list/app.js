const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());
app.use(express.json()); // JSON 데이터를 읽기 위함

// Swagger 설정
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TO do List API',
      version: '1.0.0',
      description: '일정 관리 프로젝트 API 문서입니다.',
    },
    servers: [{ url: `http://localhost:${PORT}` }],
  },
  apis: [path.join(__dirname, 'src/routes/*.js')], // routes 폴더 안의 파일들을 읽어 문서화
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// 기본 경로 테스트
app.get('/', (req, res) => {
  res.send('서버 테스트 완료');
});

//라우터 연결   
const scheduleRoutes = require('./src/routes/scheduleRoutes');
app.use('/api/schedules', scheduleRoutes);

app.listen(PORT, () => {
  console.log(`1.서버 시작: http://localhost:${PORT}`);
  console.log(`2.Swagger 문서: http://localhost:${PORT}/api-docs`);
});