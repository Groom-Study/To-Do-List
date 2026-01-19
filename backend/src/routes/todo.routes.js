import { Router } from 'express';
import {
  getAll,
  create,
  getById,
  update,
  reorder,
  remove,
  removeMany,
} from '../controllers/todo.controller.js';

const router = Router();

/**
 * @openapi
 * /api/todos:
 *  get:
 *    tags:
 *      - API
 *    summary: 전체 할 일 목록 조회
 *    responses:
 *      200:
 *        description: 할 일 목록 배열
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Todo'
 */
router.get('/', getAll);

/**
 * @openapi
 * /api/todos:
 *  post:
 *    tags:
 *      - API
 *    summary: 할 일 생성
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TodoInput'
 *    responses:
 *      201:
 *        description: 생성된 할 일
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Todo'
 */
router.post('/', create);

/**
 * @openapi
 * /api/todos/{id}:
 *  get:
 *    tags:
 *      - API
 *    summary: 단일 할 일 조회
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: Todo ID
 *    responses:
 *      200:
 *        description: 단일 할 일
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Todo'
 */
router.get('/:id', getById);

/**
 * @openapi
 * /api/todos/{id}:
 *  put:
 *    tags:
 *      - API
 *    summary: 할 일 업데이트
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TodoInput'
 *    responses:
 *      200:
 *        description: 업데이트된 할 일
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Todo'
 */
router.put('/:id', update);

/**
 * @openapi
 * /api/todos/reorder:
 *  patch:
 *    tags:
 *      - API
 *    summary: 할 일 순서 변경
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/TodoReorderItem'
 *    responses:
 *      200:
 *        description: 할 일 순서 변경
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/TodoReorderItem'
 */
router.patch('/reorder', reorder);

/**
 * @openapi
 * /api/todos/{id}:
 *  delete:
 *    tags:
 *      - API
 *    summary: 할 일 삭제
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      204:
 *        description: 삭제 성공
 */
router.delete('/:id', remove);

/**
 * @openapi
 * /api/todos:
 *  delete:
 *    tags:
 *      - API
 *    summary: 선택된 할 일 삭제
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              ids:
 *                type: array
 *                items:
 *                  type: string
 *    responses:
 *      200:
 *        description: 삭제 성공
 */
router.delete('/', removeMany);

export default router;
