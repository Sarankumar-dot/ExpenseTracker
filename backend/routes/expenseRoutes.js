const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

const {
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
} = require('../controllers/expenseController');

router.post('/expenses', verifyToken, createExpense);
router.get('/expenses', verifyToken, getExpense);
router.delete('/expenses/:id', verifyToken, deleteExpense);
router.put('/expenses/:id', verifyToken, updateExpense);

module.exports = router;
