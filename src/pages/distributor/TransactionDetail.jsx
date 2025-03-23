import { useParams } from "react-router-dom";

const transactions = [
  { id: "TXN001", userId: "1", user: "John Doe", amount: "$500", status: "Success", date: "2025-03-10", method: "Credit Card", ref: "PAY123456" },
  { id: "TXN002", userId: "1", user: "John Doe", amount: "$750", status: "Pending", date: "2025-03-09", method: "Bank Transfer", ref: "PAY654321" },
  { id: "TXN003", userId: "2", user: "Jane Smith", amount: "$200", status: "Failed", date: "2025-03-08", method: "Paystack", ref: "PAY987654" },
  { id: "TXN004", userId: "3", user: "Mike Johnson", amount: "$400", status: "Success", date: "2025-03-07", method: "PayPal", ref: "PAY567890" },
];

const TransactionDetail = () => {
  const { userId, id } = useParams();
  const transaction = transactions.find((txn) => txn.userId === userId && txn.id === id);

  if (!transaction) {
    return <h2 className="text-red-500">Transaction Not Found</h2>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Transaction Details</h2>
      <p><strong>Transaction ID:</strong> {transaction.id}</p>
      <p><strong>User:</strong> {transaction.user}</p>
      <p><strong>Amount:</strong> {transaction.amount}</p>
      <p><strong>Status:</strong> {transaction.status}</p>
      <p><strong>Date:</strong> {transaction.date}</p>
      <p><strong>Payment Method:</strong> {transaction.method}</p>
      <p><strong>Reference:</strong> {transaction.ref}</p>
    </div>
  );
};

export default TransactionDetail;
