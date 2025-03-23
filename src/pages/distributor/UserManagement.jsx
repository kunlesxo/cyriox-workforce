import { useState } from "react";

const UserManagement = () => {
  const [search, setSearch] = useState("");
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Inactive" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "User", status: "Active" },
  ];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>
      
      <input 
        type="text" 
        placeholder="Search users..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded-lg mb-4"
      />
      
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="border-b">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className={`p-3 font-semibold ${user.status === "Active" ? "text-green-600" : "text-red-600"}`}>{user.status}</td>
                <td className="p-3">
                  <button className="px-3 py-1 bg-blue-600 text-white rounded-lg mr-2">Edit</button>
                  <button className="px-3 py-1 bg-red-600 text-white rounded-lg">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
