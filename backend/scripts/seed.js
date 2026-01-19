import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Todo from '../src/models/todo.model.js';

dotenv.config();

const seedTodoList = [
  {
    title: '공부하기',
    done: false,
    order: 1,
  },
  {
    title: '운동하기',
    done: false,
    order: 2,
  },
  {
    title: '밥먹기',
    done: false,
    order: 3,
  },
  {
    title: '청소하기',
    done: false,
    order: 4,
  },
  {
    title: '잠자기',
    done: false,
    order: 5,
  },
];

const seed = async () => {
  try {
    await Todo.deleteMany({});
    await Todo.insertMany(seedTodoList);

    console.log('✅ Seed data inserted!');
    process.exit(0);
  } catch (err) {
    console.log('✅ Seed failed!', err);
    process.exit(1);
  }
};

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected!');
    seed();
  })
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));
