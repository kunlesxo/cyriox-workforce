import React, { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

const UserDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
            ),
            label: 'Profile',
            path: '/dashboard/profile'
        },
        { 
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
            ),
            label: 'Cart',
            path: '/dashboard/cart'
        },
        { 
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            label: 'My Subscriptions',
            path: '/dashboard/subscriptions'
        },
        { 
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H8.25m-3 15V6.375m0 12.75v1.5a2.25 2.25 0 002.25 2.25h9.75a2.25 2.25 0 002.25-2.25v-1.5m-3-12V6a2.25 2.25 0 00-2.25-2.25H8.25A2.25 2.25 0 006 6v1.5m3 12h7.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H8.25M6 15v-.75m3.75 0H6v-.75m0 3h7.5V9.75h-7.5v6zm3-9h.008v.008H12V9z" />
                </svg>
            ),
            label: 'Billing',
            path: '/dashboard/billing'
        },
        { 
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
            ),
            label: 'Orders',
            path: '/dashboard/orders'
        },
        { 
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.339 48.114 48.114 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
            ),
            label: 'Support',
            path: '/dashboard/support'
        }
    ];

    const handleSignOut = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    // Cart items count (you would typically get this from context/state)
    const cartItemsCount = 3;

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg
                transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                md:relative md:translate-x-0
                border-r border-gray-200
                rounded-r-3xl overflow-hidden
            `}>
                <div className="flex items-center justify-between h-16 bg-green-600 text-white font-bold px-4">
                    <span className="text-lg">User Dashboard</span>
                    <button 
                        onClick={() => setIsSidebarOpen(false)}
                        className="text-white hover:bg-green-700 rounded-full p-1 transition-colors"
                    >
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
                            className={`
                                flex items-center px-6 py-3 text-sm font-medium
                                transition-all duration-200 ease-in-out
                                group
                                ${location.pathname === item.path 
                                    ? 'bg-green-50 text-green-700 border-r-4 border-green-600' 
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
                            `}
                        >
                            <div className={`
                                mr-3 p-2 rounded-xl transition-all duration-300
                                ${location.pathname === item.path 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'group-hover:bg-gray-200'}
                            `}>
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
                        <button 
                            onClick={handleSignOut}
                            className="w-full text-left flex items-center text-red-600 hover:text-red-800 transition-colors group"
                        >
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
                {/* Top Navigation */}
                <header className="bg-white shadow-md m-2 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between h-16 px-6">
                        <div className="flex items-center">
                            {!isSidebarOpen && (
                                <button 
                                    onClick={() => setIsSidebarOpen(true)}
                                    className="p-2 -ml-2 text-gray-500 rounded-md hover:bg-gray-100 mr-4 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            )}
                            <h1 className="text-xl font-semibold text-gray-800 hidden md:block">User Dashboard</h1>
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
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.2V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.2c0 .282-.111.551-.405.795L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span className="absolute -top-1 -right-1 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-red-500 animate-pulse"></span>
                            </div>

                            {/* User Profile */}
                            <div className="flex items-center hover:bg-gray-100 p-2 rounded-lg transition-colors group">
                                <div className="h-8 w-8 rounded-full bg-green-500 mr-3 group-hover:scale-110 transition-transform"></div>
                                <span className="text-sm font-medium text-gray-700 group-hover:text-green-600">Jane Smith</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <div className="container mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default UserDashboard;