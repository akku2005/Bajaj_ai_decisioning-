import React, { useState } from 'react';

const ConversionTab = () => {
  const [conversionEvent, setConversionEvent] = useState('Conversion');
  const [dataAsset, setDataAsset] = useState('subscription_events');
  const [eventTimestamp, setEventTimestamp] = useState('event_date');
  const [matchingEvent, setMatchingEvent] = useState('Action Parameters (pretty exact)');
  const [successMetric, setSuccessMetric] = useState('value');
  const [valueColumn, setValueColumn] = useState('incremental_value');
  const [metricName, setMetricName] = useState('Incremental Monthly Value');


  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-8 space-y-8">
      {/* Event Configuration Section */}
      <div className="grid grid-cols-4 gap-6">
        {/* Event */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Event
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-green-500 pointer-events-none z-10"></div>
            <select
              value={conversionEvent}
              onChange={(e) => setConversionEvent(e.target.value)}
              className="w-full pl-6 pr-3 py-2.5 border border-gray-300 rounded-md text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Conversion">Conversion</option>
              <option value="Click-through">Click-through</option>
              <option value="Form submission">Form submission</option>
              <option value="Approval">Approval</option>
              <option value="Disbursement">Disbursement</option>
              <option value="Application">Application</option>
              <option value="Purchase">Purchase</option>
            </select>
          </div>
        </div>

        {/* Data Asset */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Data Asset
          </label>
          <select
            value={dataAsset}
            onChange={(e) => setDataAsset(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="subscription_events">subscription_events</option>
            <option value="transaction_events">transaction_events</option>
            <option value="application_events">application_events</option>
            <option value="disbursement_events">disbursement_events</option>
          </select>
        </div>

        {/* Event Timestamp */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Event Timestamp
          </label>
          <select
            value={eventTimestamp}
            onChange={(e) => setEventTimestamp(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="event_date">event_date</option>
            <option value="created_at">created_at</option>
            <option value="updated_at">updated_at</option>
            <option value="timestamp">timestamp</option>
          </select>
        </div>

        {/* Matching Event to Recommendation */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Matching Event to Recommendation
          </label>
          <select
            value={matchingEvent}
            onChange={(e) => setMatchingEvent(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Action Parameters (pretty exact)">Action Parameters (pretty exact)</option>
            <option value="Customer ID">Customer ID</option>
            <option value="Recommendation ID">Recommendation ID</option>
            <option value="Campaign ID">Campaign ID</option>
          </select>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Success Metric Section */}
      <div className="space-y-6">
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Define the success metric. The goal is to maximize:
          </h3>

          <div className="space-y-3">
            {/* Number of conversions */}
            <label className="flex items-start space-x-3 cursor-pointer group">
              <input
                type="radio"
                name="successMetric"
                value="count"
                checked={successMetric === 'count'}
                onChange={(e) => setSuccessMetric(e.target.value)}
                className="mt-0.5 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-800">Number of conversions</span>
              </div>
            </label>

            {/* Value associated with conversions */}
            <label className="flex items-start space-x-3 cursor-pointer group">
              <input
                type="radio"
                name="successMetric"
                value="value"
                checked={successMetric === 'value'}
                onChange={(e) => setSuccessMetric(e.target.value)}
                className="mt-0.5 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-800">
                  Value that is associated with conversions (e.g., revenue or incremental NPV)
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Value Column Selection - Only shown when value metric is selected */}
        {successMetric === 'value' && (
          <div className="ml-7 space-y-4 pb-4 border-b border-gray-200">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-800">
                Select the column that represents the value of the conversion
              </label>
              <select
                value={valueColumn}
                onChange={(e) => setValueColumn(e.target.value)}
                className="w-full max-w-xs px-3 py-2.5 border border-gray-300 rounded-md text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="incremental_value">incremental_value</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-800">
                Give a human readable name for the success metric
              </label>
              <input
                type="text"
                value={metricName}
                onChange={(e) => setMetricName(e.target.value)}
                className="w-full max-w-md px-3 py-2.5 border border-gray-300 rounded-md text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Incremental Monthly Value"
              />
            </div>
          </div>
        )}



        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <button className="px-5 py-2.5 border border-gray-300 rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button className="px-5 py-2.5 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors">
            Save Configuration
          </button>
        </div>
      </div>
      </div>
  );
};

export default ConversionTab;
