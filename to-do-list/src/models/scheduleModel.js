const db = require('../config/db');

const Schedule = {
  // 1. 일정 생성
  create: async (title, description, due_date) => {
    const sql = `INSERT INTO schedules (title, description, due_date) VALUES (?, ?, ?)`;
    const [result] = await db.execute(sql, [title, description, due_date]);
    return result;
  },

  // 2. 전체 일정 목록 조회
  findAll: async () => {
    const sql = `SELECT * FROM schedules ORDER BY created_at DESC`;
    const [rows] = await db.execute(sql);
    return rows;
  },

  // 3. 일정 수정
  update: async (id, title, description, due_date) => {
    const sql = `UPDATE schedules SET title = ?, description = ?, due_date = ? WHERE id = ?`;
    const [result] = await db.execute(sql, [title, description, due_date, id]);
    return result;
  },

  // 4. 일정 완료 여부 토글 (db의 - is_completed 값을 반전시킴 0 or 1)
  toggleComplete: async (id) => {
    const sql = `UPDATE schedules SET is_completed = NOT is_completed WHERE id = ?`;
    const [result] = await db.execute(sql, [id]);
    return result;
  },

  // 5. 일정 삭제
  delete: async (id) => {
    const sql = `DELETE FROM schedules WHERE id = ?`;
    const [result] = await db.execute(sql, [id]);
    return result;
  }
};

module.exports = Schedule;