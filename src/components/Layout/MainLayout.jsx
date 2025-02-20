import React from 'react';
import Navbar from '../shared/Navbar';
import { Outlet, useLocation } from 'react-router-dom';

const MainLayout = () => {
    const location = useLocation();
    const hideNavbarRoutes = ['/dashboard']; // Add routes here where you don't want to show the Navbar

    return (
        <div className='lg:w-[1024px] w-[320px] mx-auto'>
            {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
            <Outlet />
        </div>
    );
};

export default MainLayout;