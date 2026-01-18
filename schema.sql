-- Docker에서 자동으로 todo_db 데이터베이스가 생성되므로 USE만 실행
USE todo_db;

-- schedules 테이블 생성
CREATE TABLE IF NOT EXISTS schedules (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(20) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  due_date DATE NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  INDEX idx_created_at (created_at),
  INDEX idx_due_date (due_date),
  INDEX idx_is_completed (is_completed)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
