const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo List API',
      version: '1.0.0',
      description: '일정 관리 프로젝트 API 문서입니다.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: '로컬 개발 서버'
      }
    ],
    tags: [
      {
        name: 'Schedules',
        description: '일정 관리 API'
      }
    ]
  },
  apis: ['./routes/*.js'], // routes 폴더의 모든 파일에서 문서 추출
};

const specs = swaggerJsdoc(options);

module.exports = specs;
