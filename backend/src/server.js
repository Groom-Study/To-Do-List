import express from 'express';
import cors from 'cors';
import './config.js';
import todoRoutes from './routes/todo.routes.js';
import { setupSwagger } from './swagger.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/todos', todoRoutes);

setupSwagger(app);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

export default app;

const PORT = process.env.PORT || 4000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}
