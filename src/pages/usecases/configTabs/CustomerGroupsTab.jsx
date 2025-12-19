import React from 'react';
import { Info, Plus, Trash2, Lock, Sparkles, AlertTriangle } from 'lucide-react';

const CustomerGroupsTab = ({ segments, groups }) => {
  // Enforce 3-group structure to bypass stale persisted data
  const displaySegments = [
    { label: 'AI Suggestion', value: 80, color: 'bg-blue-600' },
    { label: 'Control Group', value: 10, color: 'bg-amber-500' },
    { label: 'Holdout Group', value: 10, color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Targeted Audience Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Left Col: Query / Definition */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">TARGETED AUDIENCE</h2>
              <Info size={14} className="text-gray-400 cursor-help" />
            </div>

            <div className="bg-gray-50/80 rounded-lg p-5 border border-gray-100 font-mono text-xs leading-loose relative">
              <div className="text-gray-800">
                <span className="text-gray-400 select-none mr-2">where</span>
                <span className="font-semibold">current_plan != Premium</span>
                <span className="text-amber-600 font-bold mx-2">AND</span>
                <br />
                <span className="font-semibold">days_since_signup &gt;= 61</span>
                <span className="text-amber-600 font-bold mx-2">AND</span>
                <br />
                <span className="font-semibold">is_cancelled_1d = FALSE</span>
                <span className="text-amber-600 font-bold mx-2">AND</span>
                <br />
                <span className="font-semibold">is_unsubscribed_1d = FALSE</span>
              </div>

              <div className="mt-4 flex gap-4 text-[11px] font-bold uppercase tracking-wider">
                <button className="text-blue-600 hover:text-blue-700 transition-colors">Edit</button>
                <button className="text-red-500 hover:text-red-600 transition-colors">Delete</button>
              </div>
            </div>
          </div>

          {/* Right Col: Visualization */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Stats Header */}
              <div className="flex items-baseline justify-end space-x-3 mb-4">
                <span className="text-4xl font-extrabold text-gray-900 tracking-tight">832,679</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Audience Count</span>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 mb-3">
                {displaySegments.map((segment) => { // Updated to use segments prop
                  let textColor = segment.color?.replace('bg-', 'text-') || 'text-gray-600';

                  // Override for lighter backgrounds or specific design choices
                  if (segment.color?.includes('yellow') || segment.color?.includes('green')) {
                    textColor = 'text-gray-900';
                  }

                  return (
                    <div key={segment.label} className="flex items-center space-x-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${segment.color}`} />
                      <span className={`text-[11px] font-extrabold ${textColor}`}>
                        {segment.value}%
                      </span>
                      <span className={`text-[10px] font-bold uppercase ${textColor}`}>
                        {segment.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-5 flex rounded-full overflow-hidden shadow-inner bg-gray-100 ring-1 ring-gray-200/60">
              {displaySegments.map((segment) => ( // Updated to use segments prop
                <div
                  key={segment.label}
                  className={`${segment.color} h-full relative group`}
                  style={{ width: `${segment.value}%` }}
                  title={`${segment.label}: ${segment.value}%`}
                >
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Audience Breakdown Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-white">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-gray-900">Audience breakdown</h3>
            <p className="text-sm font-medium text-gray-500">Manage segments and their delivery rules</p>
          </div>
          <button className="inline-flex items-center space-x-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md shadow-blue-100 hover:shadow-blue-200 text-sm font-bold">
            <Plus size={18} />
            <span>Add customer group</span>
          </button>
        </div>

        <div className="divide-y divide-gray-50">
          <div className="grid grid-cols-12 gap-6 px-6 py-4 bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
            <div className="col-span-3">Name</div>
            <div className="col-span-6">Condition</div>
            <div className="col-span-3">Prediction Method</div>
          </div>

          {groups.map((group, idx) => (
            <div key={idx} className="px-6 py-6 grid grid-cols-12 gap-6 items-start hover:bg-gray-50/30 transition-colors group">
              {/* Name Column */}
              <div className="col-span-3 space-y-3">
                <div
                  className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-sm ring-1 ring-white/20 ${group.name.includes('AI') ? 'bg-blue-600' :
                    group.name.includes('Control') ? 'bg-amber-500' :
                      group.name.includes('Holdout') ? 'bg-rose-500' :
                        group.name.includes('BAU') ? 'bg-white border border-rose-200 text-rose-600' :
                          group.color || 'bg-gray-600'
                    }`}
                >
                  {group.name.includes('AI') && <Sparkles size={12} className="mr-1.5" />}
                  {group.name}
                </div>
                {group.note && (
                  <div className="flex items-start space-x-2 text-xs text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-100/60">
                    <AlertTriangle size={14} className="shrink-0 mt-0.5 text-amber-500" />
                    <span className="font-semibold leading-relaxed">{group.note}</span>
                  </div>
                )}
              </div>

              {/* Condition Column */}
              <div className="col-span-6">
                <div className="relative group/code">
                  <pre className="whitespace-pre-wrap bg-white border border-gray-200 rounded-xl p-4 text-[11px] font-mono text-gray-600 leading-relaxed overflow-x-auto shadow-sm group-hover/code:border-gray-300 transition-colors">
                    {group.condition}
                  </pre>
                </div>
                {group.name === 'OfferFit' && (
                  <p className="text-sm text-gray-600 mt-2 font-medium">{group.description}</p>
                )}
              </div>

              {/* Prediction Method Column */}
              <div className="col-span-3 flex items-start justify-between gap-3">
                <div className="w-full">
                  <select
                    defaultValue={group.prediction}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-xs font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer hover:border-gray-300"
                  >
                    <option value={group.prediction}>{group.prediction}</option>
                    <option value="Propensity model">Propensity model</option>
                    <option value="Uplift model">Uplift model</option>
                    <option value="Do not send recommendations">Do not send recommendations</option>
                    <option value="Random actions">Random actions</option>
                  </select>
                </div>
                <button
                  className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove group"
                >
                  {group.name.includes('AI') || group.name.includes('OfferFit') ? (
                    <Lock size={16} className="text-gray-300 cursor-not-allowed" />
                  ) : (
                    <Trash2 size={16} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerGroupsTab;
