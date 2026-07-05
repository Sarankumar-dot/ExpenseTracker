import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../expenseComponenets/Navbar';
import SummaryCard from '../expenseComponenets/SummaryCard';
import ExpenseCard from '../expenseComponenets/ExpenseCard';
import ExpenseForm from '../expenseComponenets/ExpenseForm';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [expenseDate, setExpenseDate] = useState('');

  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();

  //logout function
  function handleLogout() {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  }

  //total amount
  const totalAmount = expenses.reduce((acc, value, index) => acc + Number(value.amount), 0);

  // getting users email and id
  async function getDashboardData() {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/');
        return;
      }

      const request = await fetch('http://localhost:3000/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await request.json();

      if (response.success) {
        setUser(response.user);
      } else {
        navigate('/');
      }
    } catch (e) {
      console.log(e.message);
      navigate('/');
    }
  }

  // displaying expenses and dashboard data when the component renders the first time
  useEffect(() => {
    getDashboardData();
    getExpenses();
  }, []);

  // getting expense
  async function getExpenses() {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
      return;
    }

    try {
      const request = await fetch('http://localhost:3000/expenses', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      const response = await request.json();

      if (response.success) {
        setExpenses(response.expenses);
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  // adding expense
  async function handleAddExpense() {
    const token = localStorage.getItem('token');

    if (!title || !amount || !category || !expenseDate) {
      alert('All fields are required');
      return;
    }
    try {
      const request = await fetch('http://localhost:3000/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, amount, category, expense_date: expenseDate }),
      });

      const data = await request.json();

      if (data.success) {
        setTitle('');
        setAmount('');
        setCategory('');
        setExpenseDate('');

        getExpenses();
      } else {
        console.log(response.message);
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  // delete function
  async function handleDelete(id) {
    const token = localStorage.getItem('token');

    try {
      const request = await fetch(`http://localhost:3000/expenses/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const response = await request.json();

      if (response.success) {
        console.log('✅ Expense deleted successfully');
        getExpenses();
      } else {
        console.log(response.message);
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  function handleEdit(expense) {
    setTitle(expense.title);
    setAmount(expense.amount);
    setCategory(expense.category);
    setExpenseDate(expense.expense_date.split('T')[0]);
    setEditingId(expense.id);
  }

  async function handleUpdate() {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
      return;
    }

    try {
      const request = await fetch(`http://localhost:3000/expenses/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, amount, category, expense_date: expenseDate }),
      });

      const response = await request.json();

      if (response.success) {
        setTitle('');
        setAmount('');
        setCategory('');
        setExpenseDate('');
        setEditingId(null);

        getExpenses();
      } else {
        console.log(response.message);
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} handleLogout={handleLogout} />

      <div className="max-w-6xl mx-auto p-6">
        <SummaryCard title={'Total Expense'} value={`${totalAmount}`} color={'text-green-600'} />
        <ExpenseForm
          title={title}
          setTitle={setTitle}
          amount={amount}
          setAmount={setAmount}
          category={category}
          setCategory={setCategory}
          expenseDate={expenseDate}
          setExpenseDate={setExpenseDate}
          handleSubmit={editingId ? handleUpdate : handleAddExpense}
          editing={editingId !== null}
        />

        {expenses.map((value, index) => (
          <ExpenseCard
            key={value.id}
            expense={value}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
