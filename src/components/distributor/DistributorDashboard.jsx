import React from 'react'
import { Outlet, Link } from "react-router-dom";
const AdminDashboard = () => {
  return (
    
<div class="bg-gray-50">
    <header class="sticky top-2 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm">
        <nav
            class="relative max-w-[85rem] w-full bg-white border border-gray-200 rounded-[2rem] mx-2 py-2.5 px-4 md:flex md:items-center md:justify-between md:py-0 md:px-6 lg:px-8 xl:mx-auto">
            <div class="flex items-center justify-between">
                   
                <div class="md:hidden">
                    <button type="button"
                        class="p-2 inline-flex justify-center items-center gap-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="hidden md:block">
                <div class="flex md:items-center gap-5">
                    <a class="py-3 px-1 border-b-2 border-gray-800 font-medium text-gray-800" href="#">Home</a>
                    <a class="py-3 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-800"
                        href="#">Projects</a>
                    <a class="py-3 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-800"
                        href="#">Work</a>
                    <a class="py-3 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-800"
                        href="#">Articles</a>
                </div>
            </div>
        </nav>
    </header>
   

    
    <div class="flex flex-col md:flex-row min-h-screen">
        
        <aside
            class="fixed bottom-0 md:bottom-auto md:left-0 md:top-0 w-full md:w-64 bg-white border-t md:border-t-0 md:border-r border-gray-200 md:h-screen md:pt-20 z-40">
            <nav class="flex md:flex-col px-4 py-2 md:py-4 md:space-y-2">
                <div class="flex-1 md:flex-none">
                    <h2 class="hidden md:block text-xs uppercase font-semibold text-gray-500 tracking-wide mb-2">
                        Dashboard</h2>  
                    <div class="flex md:flex-col justify-around md:space-y-2">
                        <a href="#"
                            class="flex flex-col md:flex-row items-center px-2 md:px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                            <svg class="w-6 h-6 md:w-5 md:h-5 md:mr-2" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z">
                                </path>
                            </svg>
                            <span class="text-xs md:text-sm">Home</span>
                        </a>
                     <Link to="/dashboard/user">
                     <div
                            class="flex flex-col md:flex-row items-center px-2 md:px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                            <svg class="w-6 h-6 md:w-5 md:h-5 md:mr-2" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                            </svg>
                            <span class="text-xs md:text-sm">Users</span>
                        </div>
                     </Link>

                     <Link to="/dashboard/invoice">
                        <div
                            class="flex flex-col md:flex-row items-center px-2 md:px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                            <svg class="w-6 h-6 md:w-5 md:h-5 md:mr-2" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                                </path>
                            </svg>
                            <span class="text-xs md:text-sm">Invoice</span>
                        </div>
                        </Link>
                        <Link to="/dashboard/transactions">
                        <div
                            class="flex flex-col md:flex-row items-center px-2 md:px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                            <svg class="w-6 h-6 md:w-5 md:h-5 md:mr-2" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                                </path>
                            </svg>
                            <span class="text-xs md:text-sm">Transactions</span>
                        </div>
                        </Link>
                        <a href="#"
                            class="flex flex-col md:flex-row items-center px-2 md:px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                            <svg class="w-6 h-6 md:w-5 md:h-5 md:mr-2" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                                </path>
                            </svg>
                            <span class="text-xs md:text-sm">Messages</span>
                        </a>

                        <a href="#"
                            class="flex flex-col md:flex-row items-center px-2 md:px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                            <svg class="w-6 h-6 md:w-5 md:h-5 md:mr-2" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                                </path>
                            </svg>
                            <span class="text-xs md:text-sm">Logout</span>
                        </a>
                    </div>
                </div>
            </nav>
        </aside>

        <main class="flex-1 p-4 md:p-8 md:ml-64 mb-20 md:mb-0">
          <Outlet/>
        </main>
    </div>
</div>

  )

}

export default AdminDashboard