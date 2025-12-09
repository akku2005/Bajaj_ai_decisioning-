import React from 'react';
import { Info, Plus } from 'lucide-react';

const CustomerGroupsTab = ({ segments, groups }) => (
  <>
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold text-gray-900">Targeted Audience</h2>
          <Info size={16} className="text-gray-500" />
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-800">832,679</p>
          <p className="text-xs uppercase tracking-wide text-gray-500">Audience Count</p>
        </div>
      </div>

      <div className="flex items-center space-x-2 text-xs font-semibold text-gray-700">
        {segments.map((segment) => (
          <div key={segment.label} className="flex items-center space-x-1">
            <span className={`w-3 h-3 rounded-sm ${segment.color}`} />
            <span>{segment.label}</span>
          </div>
        ))}
      </div>

      <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
        <div className="flex h-full">
          {segments.map((segment) => (
            <div
              key={segment.label}
              className={segment.color}
              style={{ width: `${segment.value}%` }}
              aria-label={segment.label}
            />
          ))}
        </div>
      </div>
    </div>

    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-900">Audience breakdown</h3>
          <p className="text-sm text-gray-600">Manage segments and their delivery rules</p>
        </div>
        <button className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors text-sm font-semibold">
          <Plus size={16} />
          <span>Add customer group</span>
        </button>
      </div>

      <div className="divide-y divide-gray-200">
        {groups.map((group) => (
          <div key={group.name} className="px-6 py-5 flex items-start gap-4">
            <div className="w-32">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white ${group.color}`}
              >
                {group.name}
              </span>
              {group.note && (
                <p className="text-xs text-red-500 mt-2 flex items-start space-x-1">
                  <span>⚠️</span>
                  <span>{group.note}</span>
                </p>
              )}
            </div>

            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-700 uppercase mb-1">Condition</p>
              <pre className="whitespace-pre-wrap bg-gray-100 border border-gray-200 rounded-md p-3 text-sm text-gray-800">
                {group.condition}
              </pre>
            </div>

            <div className="w-64">
              <p className="text-xs font-semibold text-gray-700 uppercase mb-1">Prediction Method</p>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>{group.prediction}</option>
                <option>Propensity model</option>
                <option>Uplift model</option>
                <option>Do not send recommendations</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
);

export default CustomerGroupsTab;
