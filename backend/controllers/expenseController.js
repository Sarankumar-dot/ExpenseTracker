const db = require('../config/config');

const createExpense = async (req, res) => {
  const { title, amount, category, expense_date } = req.body;
  const user_id = req.user.id;

  if (!title || !amount || !category || !expense_date) {
    return res.status(400).json({
      success: false,
      message: 'bad request check title,amount,category,expense',
    });
  }

  try {
    const query = `insert into expenses(user_id,title,amount,category,expense_date) values(?,?,?,?,?)`;

    const [rows] = await db.query(query, [user_id, title, amount, category, expense_date]);

    if (rows.affectedRows > 0) {
      return res.status(201).json({
        success: true,
        message: 'expense added',
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'expense could not be added',
      });
    }
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const getExpense = async (req, res) => {
  const user_id = req.user.id;

  try {
    const getQuery = `select id,title,amount,category,expense_date from expenses where user_id = ? order by expense_date desc`;

    const [rows] = await db.query(getQuery, [user_id]);

    if (rows.length == 0) {
      return res.status(200).json({
        success: true,
        expenses: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Data sent',
      expenses: rows,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const deleteExpense = async (req, res) => {
  const id = req.params.id;
  const user_id = req.user.id;

  try {
    const query = `delete from expenses where id = ? and user_id = ?`;

    const [result] = await db.query(query, [id, user_id]);

    if (result.affectedRows == 0) {
      return res.status(404).json({
        success: false,
        message: 'no expense to delete',
      });
    } else {
      return res.status(200).json({
        success: true,
        message: 'expense deleted',
      });
    }
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const updateExpense = async (req, res) => {
  const id = req.params.id;
  const { title, amount, category, expense_date } = req.body;
  const user_id = req.user.id;

  if (!title || !amount || !category || !expense_date) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required',
    });
  }
  try {
    const updateQuery = `update expenses set title = ? , amount = ? ,category = ?,expense_date = ? where id = ? and user_id = ?`;

    const [result] = await db.query(updateQuery, [
      title,
      amount,
      category,
      expense_date,
      id,
      user_id,
    ]);

    if (result.affectedRows > 0) {
      return res.status(200).json({
        success: true,
        message: 'expense updated',
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'expense doesnt exist',
      });
    }
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

module.exports = { createExpense, getExpense, deleteExpense, updateExpense };
