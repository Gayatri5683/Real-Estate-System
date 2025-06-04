import React from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate, Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      navigate('/');
    }
  }, [currentUser, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
      <p className="text-lg">Welcome, Admin! You have access to admin-only features here.</p>
      <div className="flex gap-4 mt-8">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => navigate('/admin/sellers')}
        >
          Manage Sellers
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => navigate('/admin/buyers')}
        >
          Manage Buyers
        </button>
        <main>
          <Outlet />
        </main>
      </div>
      {/* Add more admin features here */}
    </div>
  );
};

export default AdminDashboard;
