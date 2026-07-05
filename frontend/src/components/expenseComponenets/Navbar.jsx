import React from 'react';

const Navbar = ({ user, handleLogout }) => {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Expense Tracker 💰</h1>
        </div>

        <div className="flex items-center gap-5">
          <div className="text-right">
            <p className="font-semibold">{user?.name}</p>

            <p className="text-sm text-blue-100">{user?.email}</p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
