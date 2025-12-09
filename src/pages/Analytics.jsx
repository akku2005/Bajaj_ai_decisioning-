import React from 'react';
import { TrendingUp, Users, BarChart3, Activity } from 'lucide-react';

const Analytics = () => {
  const analyticsData = [
    { label: 'Jan', value: 4000 },
    { label: 'Feb', value: 3000 },
    { label: 'Mar', value: 2000 },
    { label: 'Apr', value: 2780 },
    { label: 'May', value: 1890 },
    { label: 'Jun', value: 2390 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Campaign</h1>
        <p className="text-gray-600 mt-1">Manage your campaigns</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Page Views', value: '45,231', change: '+12.5%', icon: BarChart3, color: 'bg-blue-100', iconColor: 'text-blue-600' },
          { title: 'Click Through', value: '8,234', change: '+5.2%', icon: TrendingUp, color: 'bg-green-100', iconColor: 'text-green-600' },
          { title: 'Avg Duration', value: '4m 32s', change: '+2.1%', icon: Activity, color: 'bg-purple-100', iconColor: 'text-purple-600' },
          { title: 'Bounce Rate', value: '32.5%', change: '-3.2%', icon: Users, color: 'bg-orange-100', iconColor: 'text-orange-600' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-green-600 text-sm font-medium mt-2">{stat.change}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className={`${stat.iconColor} w-6 h-6`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Analytics</h3>
        <div className="h-80 bg-gradient-to-br from-blue-50 to-indigo-50 rounded flex items-center justify-center text-gray-500">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p>Chart placeholder - Integrate Chart.js or Recharts</p>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Metrics</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Month</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Page Views</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Users</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Conversion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {analyticsData.map((data, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{data.label}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{data.value}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{Math.floor(data.value / 10)}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {((Math.random() * 10 + 2).toFixed(1))}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
