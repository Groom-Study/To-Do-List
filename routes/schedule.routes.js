const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/schedule.controller');

/**
 * @swagger
 * /api/schedules:
 *   get:
 *     summary: 전체 일정 목록 조회
 *     tags: [Schedules]
 *     responses:
 *       200:
 *         description: 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: "프로젝트 완료"
 *                   description:
 *                     type: string
 *                     example: "Todo API 개발 완료하기"
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2026-01-22T12:00:00.000Z"
 *                   due_date:
 *                     type: string
 *                     format: date
 *                     example: "2026-01-31"
 *                   is_completed:
 *                     type: integer
 *                     example: 0
 *       500:
 *         description: 서버 오류
 */
router.get('/', scheduleController.getAllSchedules);

/**
 * @swagger
 * /api/schedules:
 *   post:
 *     summary: 새 일정 추가
 *     tags: [Schedules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - due_date
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 20
 *                 example: "프로젝트 완료"
 *               description:
 *                 type: string
 *                 example: "Todo API 개발 완료하기"
 *               due_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-01-31"
 *     responses:
 *       201:
 *         description: 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "일정이 생성되었습니다."
 *                 id:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: 유효성 검사 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "제목은 필수입니다."
 *       500:
 *         description: 서버 오류
 */
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
 *         description: 일정 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - due_date
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 20
 *                 example: "수정된 제목"
 *               description:
 *                 type: string
 *                 example: "수정된 내용"
 *               due_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-02-01"
 *     responses:
 *       200:
 *         description: 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "일정이 수정되었습니다."
 *       400:
 *         description: 유효성 검사 실패
 *       404:
 *         description: 일정을 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.put('/:id', scheduleController.updateSchedule);

/**
 * @swagger
 * /api/schedules/{id}/done:
 *   patch:
 *     summary: 일정 완료 상태 토글
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 일정 ID
 *     responses:
 *       200:
 *         description: 상태 변경 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "일정 상태가 변경되었습니다."
 *       404:
 *         description: 일정을 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.patch('/:id/done', scheduleController.completeSchedule);

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
 *         description: 일정 ID
 *     responses:
 *       200:
 *         description: 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "일정이 삭제되었습니다."
 *       404:
 *         description: 일정을 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.delete('/:id', scheduleController.deleteSchedule);

module.exports = router;
