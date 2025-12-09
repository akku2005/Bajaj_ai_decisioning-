import React from 'react';
import { Plus } from 'lucide-react';

const ActionBanksTab = ({ tabs, activeSubTab, onSubTabChange, data, onAddAction }) => {
  const activeLabel = tabs[activeSubTab]?.label || 'Item';

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6 space-y-4">
      <div className="flex items-center space-x-4 border-b border-gray-200 pb-3">
        {tabs.map((tab, idx) => (
          <button
            key={tab.key}
            className={`px-3 py-2 text-sm font-semibold border-b-2 ${
              activeSubTab === idx ? 'border-blue-700 text-blue-700' : 'border-transparent text-gray-700 hover:text-gray-900'
            }`}
            onClick={() => onSubTabChange(idx)}
          >
            {tab.label}
          </button>
        ))}
        <div className="flex-1" />
        <button
          onClick={onAddAction}
          className="inline-flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-sm font-semibold"
        >
          <Plus size={16} />
          <span>Add {activeLabel}</span>
        </button>
      </div>

      {tabs[activeSubTab]?.key === 'frequencies' && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="text-left px-3 py-2 font-semibold">ID</th>
                <th className="text-left px-3 py-2 font-semibold">Name</th>
                <th className="text-left px-3 py-2 font-semibold">Description</th>
                <th className="text-left px-3 py-2 font-semibold">Count</th>
                <th className="text-left px-3 py-2 font-semibold">Period</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.frequencies?.map((row) => (
                <tr key={row.id}>
                  <td className="px-3 py-2 text-gray-800">{row.id}</td>
                  <td className="px-3 py-2 text-gray-800">{row.name}</td>
                  <td className="px-3 py-2 text-gray-800">{row.description}</td>
                  <td className="px-3 py-2 text-gray-800">{row.count}</td>
                  <td className="px-3 py-2 text-gray-800">{row.period}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tabs[activeSubTab]?.key === 'daysofweek' && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="text-left px-3 py-2 font-semibold">ID</th>
                <th className="text-left px-3 py-2 font-semibold">Day</th>
                <th className="text-left px-3 py-2 font-semibold">Description</th>
                <th className="text-left px-3 py-2 font-semibold">Day Code</th>
                <th className="text-left px-3 py-2 font-semibold">Optimal For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.daysofweek?.map((row) => (
                <tr key={row.id}>
                  <td className="px-3 py-2 text-gray-800">{row.id}</td>
                  <td className="px-3 py-2 text-gray-800">{row.name}</td>
                  <td className="px-3 py-2 text-gray-800">{row.description}</td>
                  <td className="px-3 py-2 text-gray-800">{row.dayCode}</td>
                  <td className="px-3 py-2 text-gray-800">{row.optimal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tabs[activeSubTab]?.key === 'channels' && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="text-left px-3 py-2 font-semibold">ID</th>
                <th className="text-left px-3 py-2 font-semibold">Channel</th>
                <th className="text-left px-3 py-2 font-semibold">Type</th>
                <th className="text-left px-3 py-2 font-semibold">Cost / Send</th>
                <th className="text-left px-3 py-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.channels.map((row) => (
                <tr key={row.id}>
                  <td className="px-3 py-2 text-gray-800">{row.id}</td>
                  <td className="px-3 py-2 text-gray-800">{row.name}</td>
                  <td className="px-3 py-2 text-gray-800">{row.type}</td>
                  <td className="px-3 py-2 text-gray-800">{row.cost}</td>
                  <td className="px-3 py-2 text-gray-800">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tabs[activeSubTab]?.key === 'offers' && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="text-left px-3 py-2 font-semibold">ID</th>
                <th className="text-left px-3 py-2 font-semibold">Offer</th>
                <th className="text-left px-3 py-2 font-semibold">Description</th>
                <th className="text-left px-3 py-2 font-semibold">Value</th>
                <th className="text-left px-3 py-2 font-semibold">Valid Until</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.offers.map((row) => (
                <tr key={row.id}>
                  <td className="px-3 py-2 text-gray-800">{row.id}</td>
                  <td className="px-3 py-2 text-gray-800">{row.name}</td>
                  <td className="px-3 py-2 text-gray-800">{row.description}</td>
                  <td className="px-3 py-2 text-gray-800">{row.value}</td>
                  <td className="px-3 py-2 text-gray-800">{row.valid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tabs[activeSubTab]?.key === 'times' && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="text-left px-3 py-2 font-semibold">ID</th>
                <th className="text-left px-3 py-2 font-semibold">Time Slot</th>
                <th className="text-left px-3 py-2 font-semibold">Description</th>
                <th className="text-left px-3 py-2 font-semibold">Optimal For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.times.map((row) => (
                <tr key={row.id}>
                  <td className="px-3 py-2 text-gray-800">{row.id}</td>
                  <td className="px-3 py-2 text-gray-800">{row.slot}</td>
                  <td className="px-3 py-2 text-gray-800">{row.description}</td>
                  <td className="px-3 py-2 text-gray-800">{row.optimal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tabs[activeSubTab]?.key === 'creatives' && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="text-left px-3 py-2 font-semibold">ID</th>
                <th className="text-left px-3 py-2 font-semibold">Creative</th>
                <th className="text-left px-3 py-2 font-semibold">Type</th>
                <th className="text-left px-3 py-2 font-semibold">Preview</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.creatives.map((row) => (
                <tr key={row.id}>
                  <td className="px-3 py-2 text-gray-800">{row.id}</td>
                  <td className="px-3 py-2 text-gray-800">{row.name}</td>
                  <td className="px-3 py-2 text-gray-800">{row.type}</td>
                  <td className="px-3 py-2 text-blue-700">{row.preview}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ActionBanksTab;
