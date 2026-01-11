const Schedule = require('../models/scheduleModel');

// 1. 일정 생성
exports.createSchedule = async (req, res) => {
  try {
    const { title, description, due_date } = req.body;
    if (!title || title.length < 1 || title.length > 20) {
      return res.status(400).json({ message: "제목은 1자 이상 20자 이하로 입력해주세요." });
    }
    if (!due_date) {
      return res.status(400).json({ message: "기한을 설정해주세요." });
    }
    const result = await Schedule.create(title, description, due_date);
    res.status(201).json({ message: "일정이 생성되었습니다.", id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "서버 오류가 발생했습니다.", error: error.message });
  }
};

// 2. 전체 일정 목록 조회
exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.findAll();
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: "조회 중 오류가 발생했습니다.", error: error.message });
  }
};

// 3. 일정 수정
exports.updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, due_date } = req.body;
    
    if (!title || title.length > 20) {
      return res.status(400).json({ message: "제목은 1~20자 사이여야 합니다." });
    }

    await Schedule.update(id, title, description, due_date);
    res.status(200).json({ message: "일정이 수정되었습니다." });
  } catch (error) {
    res.status(500).json({ message: "수정 중 오류가 발생했습니다.", error: error.message });
  }
};

// 4. 일정 완료 여부 토글
exports.completeSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    await Schedule.toggleComplete(id);
    res.status(200).json({ message: "일정 상태가 변경되었습니다." });
  } catch (error) {
    res.status(500).json({ message: "상태 변경 중 오류가 발생했습니다.", error: error.message });
  }
};

// 5. 일정 삭제
exports.deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    await Schedule.delete(id);
    res.status(200).json({ message: "일정이 삭제되었습니다." });
  } catch (error) {
    res.status(500).json({ message: "삭제 중 오류가 발생했습니다.", error: error.message });
  }
};