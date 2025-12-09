import React from 'react';
import { Lock, Unlock, Trash2, GripVertical, Plus } from 'lucide-react';

const DecisionDimensionTab = ({
  dimensions,
  onToggleLock,
  onDelete,
  onDragStart,
  onDragEnter,
  onDragEnd,
  draggingId,
  onAddDimension,
}) => (
  <div className="bg-white rounded-lg shadow border border-gray-200 p-6 space-y-4">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Decision Dimension</h3>
        <p className="text-sm text-gray-600">
          Configure the decision hierarchy. Drag unlocked rows to reorder; locked dimensions cannot be moved.
        </p>
      </div>
      <button
        onClick={onAddDimension}
        className="inline-flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-sm font-semibold"
      >
        <Plus size={16} />
        <span>Add Dimension</span>
      </button>
    </div>
    <div className="grid grid-cols-12 text-xs font-semibold text-gray-700 uppercase border-b border-gray-200 pb-2">
      <span className="col-span-1">#</span>
      <span className="col-span-3">Dimension</span>
      <span className="col-span-4">Description</span>
      <span className="col-span-3">Send decisions to</span>
      <span className="col-span-1 text-right">Actions</span>
    </div>
    <div className="space-y-3">
      {dimensions.map((dim, idx) => (
        <div
          key={dim.id}
          draggable={!dim.locked}
          onDragStart={(e) => onDragStart(e, idx)}
          onDragEnter={(e) => onDragEnter(e, idx)}
          onDragEnd={onDragEnd}
          className={`grid grid-cols-12 items-center p-3 rounded-lg border ${
            dim.locked ? 'bg-purple-50 border-purple-100' : 'bg-white border-gray-200'
          } ${draggingId === dim.id ? 'ring-2 ring-blue-200' : ''}`}
        >
          <div className="col-span-1 flex items-center space-x-2 text-gray-700 font-semibold">
            <span>{idx + 1}</span>
            {!dim.locked && <GripVertical size={16} className="text-gray-500 cursor-grab" />}
          </div>
          <div className="col-span-3 font-semibold text-gray-900 flex items-center space-x-2">
            {dim.locked ? <Lock size={14} className="text-gray-600" /> : <Unlock size={14} className="text-gray-600" />}
            <span>{dim.name}</span>
          </div>
          <div className="col-span-4 text-sm text-gray-700">{dim.description}</div>
          <div className="col-span-3 text-sm text-gray-700">{dim.sendTo}</div>
          <div className="col-span-1 flex justify-end space-x-2">
            <button
              className="p-2 rounded-md hover:bg-gray-100"
              onClick={() => onToggleLock(dim.id)}
              aria-label="Toggle lock"
            >
              {dim.locked ? <Lock size={16} /> : <Unlock size={16} />}
            </button>
            {!dim.locked && (
              <button
                className="p-2 rounded-md hover:bg-red-50 text-red-600"
                onClick={() => onDelete(dim.id)}
                aria-label="Delete dimension"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default DecisionDimensionTab;
