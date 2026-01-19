import Todo from '../models/todo.model.js';

export const getAll = async (req, res, next) => {
  try {
    const todos = await Todo.find().sort({ order: 1 });
    res.json(todos);
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const lastTodo = await Todo.findOne().sort({ order: -1 }).limit(1);
    const todo = await Todo.create({
      title: req.body.title,
      order: lastTodo ? lastTodo.order + 1 : 1,
    });
    const saved = await todo.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

export const getById = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Not found' });
    res.json(todo);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, done: req.body.done },
      { new: true },
    );
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const reorder = async (req, res, next) => {
  try {
    const updates = req.body;
    const updatedTodos = await Promise.all(
      updates.map(({ id, order }) =>
        Todo.findByIdAndUpdate(id, { $set: { order } }, { new: true }),
      ),
    );
    res.json(updatedTodos);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    const deleted = await Todo.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

export const removeMany = async (req, res, next) => {
  try {
    const result = await Todo.deleteMany({ _id: { $in: req.body.ids } });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Not found' });
    res.json({ deletedCount: result.deletedCount });
  } catch (err) {
    next(err);
  }
};
