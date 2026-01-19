import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/server';
import Todo from '../src/models/todo.model';

describe('Todo API', () => {
  let server = null;
  let ids = [];
  beforeAll(async () => {
    server = app.listen();

    const res1 = await request(server).post('/api/todos').send({ title: '테스트 아이템1' });
    const res2 = await request(server).post('/api/todos').send({ title: '테스트 아이템2' });
    const res3 = await request(server).post('/api/todos').send({ title: '테스트 아이템3' });
    ids = [res1.body._id, res2.body._id, res3.body._id];
  });

  let createdId = -1;
  it('POST /api/todos -> 생성', async () => {
    const res = await request(server).post('/api/todos').send({ title: '테스트 아이템' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    createdId = res.body._id;
  });

  it('PUT /api/todos/:id -> 업데이트', async () => {
    const res = await request(server)
      .put(`/api/todos/${createdId}`)
      .send({ title: '업데이트됨', done: true });
    expect(res.status).toBe(200);
    expect(res.body.done).toBe(true);
  });

  it('PATCH /api/todos/reorder -> 순서 변경', async () => {
    const res = await request(server)
      .patch('/api/todos/reorder')
      .send([
        { id: ids[0], order: 3 },
        { id: ids[1], order: 1 },
        { id: ids[2], order: 2 },
      ]);
    expect(res.status).toBe(200);

    const updates = res.body;
    expect(updates).toHaveLength(3);
    expect(updates[0].order).toBe(3);
    expect(updates[1].order).toBe(1);
    expect(updates[2].order).toBe(2);
  });

  it('DELETE /api/todos/:id -> 삭제', async () => {
    const res = await request(server).delete(`/api/todos/${createdId}`);
    expect(res.status).toBe(204);
  });

  it('DELETE /api/todos -> 선택 삭제', async () => {
    const res = await request(server).delete('/api/todos').send({ ids });
    expect(res.status).toBe(200);
    expect(res.body.deletedCount).toBe(3);
  });

  afterAll(async () => {
    // 테스트용으로 생성된 객체 정리
    await Todo.deleteOne({ _id: createdId });
    await Todo.deleteMany({ _id: { $in: ids } });

    await mongoose.connection.close();
    server.close();
  });
});
