import React from 'react'
import { Link } from 'react-router-dom'


const Cart = () => {
  return (
  
<main class="flex-1 bg-gray-50 p-4 md:p-8 md:ml-10  md:mb-0">
        <div class="max-w-4xl mx-auto">
        <h1 class="text-2xl font-bold text-gray-800 ">Shopping Cart</h1>

        <div class="bg-white rounded-xl shadow-sm mb-6">
            <div class="p-6 border-b border-gray-200">
                <div class="flex items-center space-x-4">
                   
                    <div class="flex-1">
                        <h3 class="text-lg font-semibold text-gray-800">Product Name</h3>
                        <p class="text-sm text-gray-600">Category</p>
                        <div class="flex items-center mt-2">
                            <select class="text-sm border border-gray-300 rounded-lg mr-4 p-1">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                            <button class="text-sm text-red-600 hover:text-red-700">Remove</button>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-lg font-semibold text-gray-800">$99.99</p>
                    </div>
                </div>
            </div>

            <div class="p-6 border-b border-gray-200">
                <div class="flex items-center space-x-4">
                    
                    <div class="flex-1">
                        <h3 class="text-lg font-semibold text-gray-800">Product Name</h3>
                        <p class="text-sm text-gray-600">Category</p>
                        <div class="flex items-center mt-2">
                            <select class="text-sm border border-gray-300 rounded-lg mr-4 p-1">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                            <button class="text-sm text-red-600 hover:text-red-700">Remove</button>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-lg font-semibold text-gray-800">$149.99</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
            <div class="space-y-3">
                <div class="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>$249.98</span>
                </div>
                <div class="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>$9.99</span>
                </div>
                <div class="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>$25.00</span>
                </div>
                <div class="pt-3 border-t border-gray-200">
                    <div class="flex justify-between text-lg font-semibold text-gray-800">
                        <span>Total</span>
                        <span>$284.97</span>
                    </div>
                </div>
            </div>

            <div class="mt-6">
                <div class="flex space-x-2">
                    <button
                        class="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                        Apply
                    </button>
                </div>
            </div>

            <button
                class="w-full mt-6 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Proceed to Checkout
            </button>
        </div>
    </div>
</main>
    
  )
}

export default Cart