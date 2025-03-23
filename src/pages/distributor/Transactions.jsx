import { useParams, Link } from "react-router-dom";

const transactions = [
  { id: "TXN001", userId: "1", user: "John Doe", amount: "$500", status: "Success", date: "2025-03-10" },
  { id: "TXN002", userId: "1", user: "John Doe", amount: "$750", status: "Pending", date: "2025-03-09" },
  { id: "TXN003", userId: "2", user: "Jane Smith", amount: "$200", status: "Failed", date: "2025-03-08" },
  { id: "TXN004", userId: "3", user: "Mike Johnson", amount: "$400", status: "Success", date: "2025-03-07" },
];

const Transactions = () => {
  const { userId } = useParams();
  const userTransactions = transactions.filter((txn) => txn.userId === userId);

  if (userTransactions.length === 0) {
    return <h2 className="text-red-500">No Transactions Found for This User</h2>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">User Transactions</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Transaction ID</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userTransactions.map((txn) => (
            <tr key={txn.id} className="text-center">
              <td className="border p-2">{txn.id}</td>
              <td className="border p-2">{txn.amount}</td>
              <td className="border p-2">{txn.status}</td>
              <td className="border p-2">{txn.date}</td>
              <td className="border p-2">
                <Link to={`/dashboard/transactions/${userId}/${txn.id}`} className="px-3 py-1 bg-blue-500 text-white rounded">
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

export default Transactions;
