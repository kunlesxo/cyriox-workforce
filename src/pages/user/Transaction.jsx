import React, { useState } from "react";

// Sample transaction data
const transactions = [
  {
    id: 1,
    date: "2025-03-08",
    amount: "$250.00",
    status: "Completed",
    items: [
      { name: "Indomie Carton", quantity: 2, price: "$50.00" },
      { name: "Rice Bag (50kg)", quantity: 1, price: "$200.00" },
    ],
  },
  {
    id: 2,
    date: "2025-03-07",
    amount: "$120.00",
    status: "Pending",
    items: [
      { name: "Semo (10kg)", quantity: 3, price: "$60.00" },
      { name: "Sugar (5kg)", quantity: 2, price: "$60.00" },
    ],
  },
  {
    id: 3,
    date: "2025-03-06",
    amount: "$400.00",
    status: "Failed",
    items: [
      { name: "Spaghetti Pack", quantity: 4, price: "$100.00" },
      { name: "Flow Detergent (Large)", quantity: 2, price: "$100.00" },
      { name: "Indomie Carton", quantity: 3, price: "$200.00" },
    ],
  },
];

const Transaction = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [filter, setFilter] = useState("All");

  const filteredTransactions = transactions.filter(
    (t) => filter === "All" || t.status === filter
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Transaction History</h2>

      {/* Filter Dropdown */}
      <div className="flex justify-end mb-4">
        <select
          className="px-4 py-2 border rounded-md"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {/* Transaction Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 border-b">ID</th>
              <th className="py-3 px-4 border-b">Date</th>
              <th className="py-3 px-4 border-b">Amount</th>
              <th className="py-3 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((t) => (
                <tr
                  key={t.id}
                  className="border-b hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSelectedTransaction(t)} // Open details when clicked
                >
                  <td className="py-3 px-4">{t.id}</td>
                  <td className="py-3 px-4">{t.date}</td>
                  <td className="py-3 px-4">{t.amount}</td>
                  <td
                    className={`py-3 px-4 font-semibold ${
                      t.status === "Completed"
                        ? "text-green-600"
                        : t.status === "Pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {t.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Transaction Details */}
      {selectedTransaction && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold text-gray-700 mb-3">
              Transaction Details
            </h3>
            <p className="text-gray-600">
              <strong>ID:</strong> {selectedTransaction.id}
            </p>
            <p className="text-gray-600">
              <strong>Date:</strong> {selectedTransaction.date}
            </p>
            <p className="text-gray-600">
              <strong>Amount:</strong> {selectedTransaction.amount}
            </p>
            <p className="text-gray-600">
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  selectedTransaction.status === "Completed"
                    ? "text-green-600"
                    : selectedTransaction.status === "Pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {selectedTransaction.status}
              </span>
            </p>

            <h4 className="mt-4 text-lg font-semibold text-gray-700">
              Items Purchased:
            </h4>
            <ul className="mt-2">
              {selectedTransaction.items.map((item, index) => (
                <li key={index} className="text-gray-600">
                  {item.name} - {item.quantity} x {item.price}
                </li>
              ))}
            </ul>

            {/* Close Button */}
            <button
              onClick={() => setSelectedTransaction(null)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transaction;
