import React, { useState, useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

const UserDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [username, setUsername] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve the username from localStorage or context
        const storedUsername = localStorage.getItem('username'); // or use context if set up
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const menuItems = [
        { 
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
            ),
            label: 'My Dashboard',
            path: '/dashboard'
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 12.75L9.75 8m0 0l4.5 4.75M9.75 8v9" />
                </svg>
            ),
            label: 'Orders',
            path: '/dashboard/orders'
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3h7.5m-7.5 4.5h7.5m-7.5 4.5h7.5m-7.5 4.5h7.5m-7.5 4.5h7.5" />
                </svg>
            ),
            label: 'Invoices',
            path: '/dashboard/invoices'
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-9 9m0 0l-5.25-5.25m5.25 5.25L3 9" />
                </svg>
            ),
            label: 'Cart',
            path: '/dashboard/cart'
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75l8.25 8.25 8.25-8.25M12 15V3.75" />
                </svg>
            ),
            label: 'Settings',
            path: '/dashboard/settings'
        }
    ];

    const handleSignOut = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username'); // clear username on logout
        navigate('/login');
    };

    const cartItemsCount = 3; // This is just an example, update based on actual cart data

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 border-r border-gray-200 rounded-r-3xl overflow-hidden`}>
                <div className="flex items-center justify-between h-16 bg-green-600 text-white font-bold px-4">
                    <span className="text-lg">{username}'s Dashboard</span>
                    <button onClick={() => setIsSidebarOpen(false)} className="text-white hover:bg-green-700 rounded-full p-1 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                </div>

                <nav className="py-6 space-y-1">
                    {menuItems.map((item) => (
                        <Link 
                            key={item.path} 
                            to={item.path} 
                            className={`flex items-center px-6 py-3 text-sm font-medium transition-all duration-200 ease-in-out group ${location.pathname === item.path ? 'bg-green-50 text-green-700 border-r-4 border-green-600' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
                        >
                            <div className={`mr-3 p-2 rounded-xl transition-all duration-300 ${location.pathname === item.path ? 'bg-green-100 text-green-700' : 'group-hover:bg-gray-200'}`}>
                                {item.icon}
                            </div>
                            <span>{item.label}</span>
                            {item.label === 'Cart' && cartItemsCount > 0 && (
                                <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                                    {cartItemsCount}
                                </span>
                            )}
                        </Link>
                    ))}

                    <div className="mt-auto px-6 py-4 border-t">
                        <button onClick={handleSignOut} className="w-full text-left flex items-center text-red-600 hover:text-red-800 transition-colors group">
                            <div className="mr-3 p-2 rounded-xl group-hover:bg-red-50 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                </svg>
                            </div>
                            <span>Sign Out</span>
                        </button>
                    </div>
                </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-md m-2 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between h-16 px-6">
                        <div className="flex items-center">
                            {!isSidebarOpen && (
                                <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-gray-500 rounded-md hover:bg-gray-100 mr-4 transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            )}
                            <h1 className="text-xl font-semibold text-gray-800 hidden md:block">{username}'s Dashboard</h1>
                        </div>

                        <div className="flex items-center space-x-4">
                            {/* Cart Icon with Items Count */}
                            <div className="relative group">
                                <Link to="/dashboard/cart" className="relative">
                                    <svg className="w-6 h-6 text-gray-500 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                    </svg>
                                    {cartItemsCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                                            {cartItemsCount}
                                        </span>
                                    )}
                                </Link>
                            </div>

                            {/* Notifications */}
                            <div className="relative group">
                                <svg className="w-6 h-6 text-gray-500 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V9a6 6 0 00-12 0v5a2.032 2.032 0 01-.595 1.595L4.75 17h5.5m4.5 0v-5a2 2 0 00-2-2h-4a2 2 0 00-2 2v5m4.5 0H9" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 p-6 bg-gray-50 rounded-xl overflow-hidden">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
