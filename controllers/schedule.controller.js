const Schedule = require('../models/schedule.model');

// 전체 일정 목록 조회
exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.findAll();
    res.status(200).json(schedules);
  } catch (error) {
    console.error('Error fetching schedules:', error);
    res.status(500).json({ message: '조회 중 오류가 발생했습니다.', error: error.message });
  }
};

// 새 일정 추가
exports.createSchedule = async (req, res) => {
  try {
    const { title, description, due_date } = req.body;

    // 유효성 검사
    if (!title || title.trim().length === 0) {
      return res.status(400).json({ message: '제목은 필수입니다.' });
    }

    if (title.length > 20) {
      return res.status(400).json({ message: '제목은 20자 이하여야 합니다.' });
    }

    if (!due_date) {
      return res.status(400).json({ message: '기한은 필수입니다.' });
    }

    const scheduleId = await Schedule.create(title, description, due_date);

    res.status(201).json({ 
      message: '일정이 생성되었습니다.', 
      id: scheduleId 
    });
  } catch (error) {
    console.error('Error creating schedule:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error.message });
  }
};

// 일정 수정
exports.updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, due_date } = req.body;

    // 일정 존재 확인
    const existingSchedule = await Schedule.findById(id);
    if (!existingSchedule) {
      return res.status(404).json({ message: '일정을 찾을 수 없습니다.' });
    }

    // 유효성 검사
    if (!title || title.trim().length === 0) {
      return res.status(400).json({ message: '제목은 필수입니다.' });
    }

    if (title.length > 20) {
      return res.status(400).json({ message: '제목은 1~20자 사이여야 합니다.' });
    }

    if (!due_date) {
      return res.status(400).json({ message: '기한은 필수입니다.' });
    }

    await Schedule.update(id, title, description, due_date);

    res.status(200).json({ message: '일정이 수정되었습니다.' });
  } catch (error) {
    console.error('Error updating schedule:', error);
    res.status(500).json({ message: '수정 중 오류가 발생했습니다.', error: error.message });
  }
};

// 일정 완료 여부 토글
exports.completeSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    // 일정 존재 확인
    const existingSchedule = await Schedule.findById(id);
    if (!existingSchedule) {
      return res.status(404).json({ message: '일정을 찾을 수 없습니다.' });
    }

    await Schedule.toggleComplete(id);

    res.status(200).json({ message: '일정 상태가 변경되었습니다.' });
  } catch (error) {
    console.error('Error toggling schedule:', error);
    res.status(500).json({ message: '상태 변경 중 오류가 발생했습니다.', error: error.message });
  }
};

// 일정 삭제
exports.deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    // 일정 존재 확인
    const existingSchedule = await Schedule.findById(id);
    if (!existingSchedule) {
      return res.status(404).json({ message: '일정을 찾을 수 없습니다.' });
    }

    await Schedule.delete(id);

    res.status(200).json({ message: '일정이 삭제되었습니다.' });
  } catch (error) {
    console.error('Error deleting schedule:', error);
    res.status(500).json({ message: '삭제 중 오류가 발생했습니다.', error: error.message });
  }
};
