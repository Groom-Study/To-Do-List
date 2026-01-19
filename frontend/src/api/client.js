import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.response.use(
  (response) => {
    // 응답 데이터에서 _id 속성을 id로 일괄 변환
    if (Array.isArray(response.data)) {
      response.data = response.data.map((item) => {
        const { _id, ...rest } = item;
        return { id: _id, ...rest };
      });
    } else {
      const { _id, ...rest } = response.data;
      response.data = { id: _id, ...rest };
    }
    return response;
  },
  (error) => {
    console.error('API Error:', error.response || error);
    return Promise.reject(error);
  },
);

export default client;
