const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

/**
 * @swagger
 * /api/schedules:
 *   get:
 *     summary: 전체 일정 목록 조회
 *     tags: [Schedules]
 *     responses:
 *       200:
 *         description: 조회 성공
 *   post:
 *     summary: 새 일정 생성
 *     tags: [Schedules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "제목을 입력"
 *               description:
 *                 type: string
 *                 example: "내용을 입력"
 *               due_date:
 *                 type: string
 *                 format: date
 *                 example: "0000-00-00"
 *     responses:
 *       201:
 *         description: 생성 성공
 */
router.get('/', scheduleController.getAllSchedules);
router.post('/', scheduleController.createSchedule);

/**
 * @swagger
 * /api/schedules/{id}:
 *   put:
 *     summary: 일정 수정
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "수정할 제목"
 *               description:
 *                 type: string
 *                 example: "수정할 내용"
 *               due_date:
 *                 type: string
 *                 format: date
 *                 example: "0000-00-00"
 *     responses:
 *       200:
 *         description: 수정 성공
 */
router.put('/:id', scheduleController.updateSchedule);
router.delete('/:id', scheduleController.deleteSchedule);

/**
 * @swagger
 * /api/schedules/{id}:
 *   delete:
 *     summary: 일정 삭제
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 삭제 성공
 */
router.delete('/:id', scheduleController.deleteSchedule);

/**
 * @swagger
 * /api/schedules/{id}/done:
 *   patch:
 *     summary: 일정 완료 여부 토글
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 상태 변경 성공
 */
router.patch('/:id/done', scheduleController.completeSchedule);

module.exports = router;