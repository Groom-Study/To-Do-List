const db = require('../config/database');

class Schedule {
  // 모든 일정 조회
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM schedules ORDER BY created_at DESC');
    return rows;
  }

  // ID로 일정 조회
  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM schedules WHERE id = ?', [id]);
    return rows[0];
  }

  // 새 일정 생성
  static async create(title, description, due_date) {
    const [result] = await db.query(
      'INSERT INTO schedules (title, description, due_date, is_completed) VALUES (?, ?, ?, ?)',
      [title, description || null, due_date, false]
    );
    
    return result.insertId;
  }

  // 일정 수정
  static async update(id, title, description, due_date) {
    const [result] = await db.query(
      'UPDATE schedules SET title = ?, description = ?, due_date = ? WHERE id = ?',
      [title, description || null, due_date, id]
    );
    
    return result.affectedRows;
  }

  // 완료 상태 토글
  static async toggleComplete(id) {
    const [result] = await db.query(
      'UPDATE schedules SET is_completed = NOT is_completed WHERE id = ?',
      [id]
    );
    
    return result.affectedRows;
  }

  // 일정 삭제
  static async delete(id) {
    const [result] = await db.query('DELETE FROM schedules WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Schedule;
