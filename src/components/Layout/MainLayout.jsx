import React from 'react';
import Navbar from '../shared/Navbar';
import { Outlet, useLocation } from 'react-router-dom';

const MainLayout = () => {
    const location = useLocation();
    const hideNavbarRoutes = ['/dashboard']; 
    const isHome = location.pathname.startsWith("/");
    return (
        <div className='w-full overflow-x-hidden mx-auto'>
            {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
            <div className={`${isHome ? "w-full" : "lg:w-[1024px] w-[320px] mx-auto"}`}>
            <Outlet />
            </div>
           
        </div>
    );
};

export default MainLayout;