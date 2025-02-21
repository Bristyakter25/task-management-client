import React from 'react';
import { NavLink, Outlet, Navigate, useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100 p-4 my-5">

      <div className='flex gap-x-3 justify-center my-5'>
        <ul className='flex gap-x-3'>
          <NavLink to='/dashboard/addTask'>
            <li className='btn'>Add Task</li>
          </NavLink>
          <NavLink to='/dashboard/myTasks'>
            <li className='btn'>My Task</li>
          </NavLink>
        </ul>
      </div>

     
      {location.pathname === "/dashboard" && <Navigate to="/dashboard/myTasks" replace />}

      
      <Outlet />
    </div>
  );
};

export default Dashboard;
