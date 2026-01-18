const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/schedule.controller');

// GET /api/schedules - 전체 일정 목록 조회
router.get('/', scheduleController.getAllSchedules);

// POST /api/schedules - 새 일정 추가
router.post('/', scheduleController.createSchedule);

// PUT /api/schedules/:id - 일정 수정
router.put('/:id', scheduleController.updateSchedule);

// PATCH /api/schedules/:id/done - 일정 완료 여부 토글
router.patch('/:id/done', scheduleController.completeSchedule);

// DELETE /api/schedules/:id - 일정 삭제
router.delete('/:id', scheduleController.deleteSchedule);

module.exports = router;
