import React from 'react'


const Order = () => {
  return (
    <main class="flex-1 bg-gray-50 p-4 md:p-8 md:ml-10  md:mb-0">
    <div class="max-w-4xl mx-auto">
        <div class="flex justify-between items-center ">
            <h1 class="text-2xl font-bold text-gray-800">Order #12345</h1>
            <span
                class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Delivered</span>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div class="flex justify-between mb-6">
                <div class="flex flex-col items-center">
                    <div
                        class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mb-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <span class="text-sm text-gray-600">Ordered</span>
                    <span class="text-xs text-gray-500">Jan 20, 2025</span>
                </div>
                <div class="flex flex-col items-center">
                    <div
                        class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mb-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <span class="text-sm text-gray-600">Shipped</span>
                    <span class="text-xs text-gray-500">Jan 21, 2025</span>
                </div>
                <div class="flex flex-col items-center">
                    <div
                        class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mb-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <span class="text-sm text-gray-600">Delivered</span>
                    <span class="text-xs text-gray-500">Jan 22, 2025</span>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm mb-6">
            <div class="p-6 border-b border-gray-200">
                <h2 class="text-lg font-semibold text-gray-800 mb-4">Order Items</h2>
                <div class="flex items-center space-x-4 mb-4">
                   
                    <div class="flex-1">
                        <h3 class="text-sm font-semibold text-gray-800">Product Name</h3>
                        <p class="text-sm text-gray-600">Quantity: 1</p>
                    </div>
                    <div class="text-right">
                        <p class="text-sm font-semibold text-gray-800">$99.99</p>
                    </div>
                </div>
                <div class="flex items-center space-x-4">
                   
                    <div class="flex-1">
                        <h3 class="text-sm font-semibold text-gray-800">Product Name</h3>
                        <p class="text-sm text-gray-600">Quantity: 2</p>
                    </div>
                    <div class="text-right">
                        <p class="text-sm font-semibold text-gray-800">$149.99</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="bg-white rounded-xl shadow-sm p-6">
                <h2 class="text-lg font-semibold text-gray-800 mb-4">Shipping Details</h2>
                <div class="space-y-2">
                    <p class="text-sm text-gray-800 font-medium">John Doe</p>
                    <p class="text-sm text-gray-600">123 Main Street</p>
                    <p class="text-sm text-gray-600">Apt 4B</p>
                    <p class="text-sm text-gray-600">New York, NY 10001</p>
                    <p class="text-sm text-gray-600">United States</p>
                    <p class="text-sm text-gray-600">Phone: (555) 123-4567</p>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm p-6">
                <h2 class="text-lg font-semibold text-gray-800 mb-4">Payment Information</h2>
                <div class="space-y-2">
                    <p class="text-sm text-gray-600">Payment Method:</p>
                    <div class="flex items-center space-x-2">
                        <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <rect x="2" y="5" width="20" height="14" rx="2" stroke-width="2" />
                            <line x1="2" y1="10" x2="22" y2="10" stroke-width="2" />
                        </svg>
                        <span class="text-sm text-gray-800">•••• •••• •••• 4242</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
            <div class="space-y-3">
                <div class="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>$249.98</span>
                </div>
                <div class="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span>$9.99</span>
                </div>
                <div class="flex justify-between text-sm text-gray-600">
                    <span>Tax</span>
                    <span>$25.00</span>
                </div>
                <div class="pt-3 border-t border-gray-200">
                    <div class="flex justify-between text-base font-semibold text-gray-800">
                        <span>Total</span>
                        <span>$284.97</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex gap-4 mt-6">
            <button
                class="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Track Order
            </button>
            <button
                class="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2">
                Download Invoice
            </button>
        </div>
    </div>
</main>
    

  )
}

export default Order