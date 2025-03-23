import { useParams } from "react-router-dom";

const invoices = [
  { id: "INV001", user: "John Doe", amount: "$500", status: "Paid", date: "2025-03-10" },
  { id: "INV002", user: "Jane Smith", amount: "$750", status: "Pending", date: "2025-03-09" },
  { id: "INV003", user: "Mike Johnson", amount: "$200", status: "Overdue", date: "2025-03-08" },
];

const InvoiceDetails = () => {
  const { id } = useParams();
  const invoice = invoices.find((inv) => inv.id === id);

  if (!invoice) {
    return <h2 className="text-red-500">Invoice Not Found</h2>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Invoice Details</h2>
      <p><strong>Invoice ID:</strong> {invoice.id}</p>
      <p><strong>User:</strong> {invoice.user}</p>
      <p><strong>Amount:</strong> {invoice.amount}</p>
      <p><strong>Status:</strong> {invoice.status}</p>
      <p><strong>Date:</strong> {invoice.date}</p>
    </div>
  );
};

export default InvoiceDetails;
