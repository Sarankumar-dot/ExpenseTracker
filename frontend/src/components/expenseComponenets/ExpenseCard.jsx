import React from 'react';

const ExpenseCard = ({ expense, handleEdit, handleDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 mb-4 border border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">{expense.title}</h2>

          <p className="text-gray-500 mt-1">{expense.category}</p>

          <p className="text-sm text-gray-400 mt-1">{expense.expense_date.split('T')[0]}</p>
        </div>

        <h2 className="text-2xl font-bold text-green-600">₹{expense.amount}</h2>
      </div>

      <div className="flex gap-3 mt-5">
        <button
          onClick={() => handleEdit(expense)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg transition"
        >
          Edit
        </button>

        <button
          onClick={() => handleDelete(expense.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ExpenseCard;
