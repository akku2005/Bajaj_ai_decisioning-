import React from 'react';
import { Mail, Phone, MapPin, Edit, Trash2 } from 'lucide-react';

const Users = () => {
  const userList = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 234 567 8900', location: 'New York', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 234 567 8901', location: 'Los Angeles', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '+1 234 567 8902', location: 'Chicago', status: 'Inactive' },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', phone: '+1 234 567 8903', location: 'Houston', status: 'Active' },
    { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', phone: '+1 234 567 8904', location: 'Phoenix', status: 'Active' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Daily Budget</h1>
          <p className="text-gray-600 mt-1">Manage your daily budget allocation</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Add User
        </button>
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userList.map((user) => (
          <div key={user.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {user.name.charAt(0)}
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                user.status === 'Active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {user.status}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
            <div className="space-y-2 mt-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>{user.location}</span>
              </div>
            </div>
            <div className="flex space-x-2 mt-6">
              <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors">
                <Edit size={16} />
                <span>Edit</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors">
                <Trash2 size={16} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
