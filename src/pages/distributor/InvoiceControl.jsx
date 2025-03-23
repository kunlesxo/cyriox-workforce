import { Link } from "react-router-dom";

const invoices = [
  { id: "INV001", user: "John Doe", amount: "$500", status: "Paid", date: "2025-03-10" },
  { id: "INV002", user: "Jane Smith", amount: "$750", status: "Pending", date: "2025-03-09" },
  { id: "INV003", user: "Mike Johnson", amount: "$200", status: "Overdue", date: "2025-03-08" },
];

const InvoiceControl = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Invoices</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Invoice ID</th>
            <th className="border p-2">User</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id} className="text-center">
              <td className="border p-2">{inv.id}</td>
              <td className="border p-2">{inv.user}</td>
              <td className="border p-2">{inv.amount}</td>
              <td className="border p-2">{inv.status}</td>
              <td className="border p-2">{inv.date}</td>
              <td className="border p-2">
                <Link to={`/dashboard/invoice/${inv.id}`} className="px-3 py-1 bg-blue-500 text-white rounded">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceControl;
