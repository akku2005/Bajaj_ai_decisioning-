import React from 'react';
import { Edit2, Settings } from 'lucide-react';

const UseCaseList = ({
  useCases = [],
  onSelectUseCase = () => { },
  onConfigureUseCase = () => { },
  onPauseUseCase = () => { },
}) => {
  return (
    <div className="space-y-6">
      {useCases.map((useCase) => {
        const isActive = useCase.status === 'Active';
        return (
          <div
            key={useCase.id}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow border border-gray-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-gray-900">{useCase.name}</h3>
                <p className="text-sm text-gray-600">{useCase.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${isActive ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'
                    }`}
                >
                  {useCase.status}
                </span>
                {isActive && (
                  <>
                    <button
                      onClick={() => onSelectUseCase(useCase)}
                      className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-700 transition-colors"
                      aria-label="Edit use case"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => onConfigureUseCase(useCase)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                    >
                      <Settings size={16} />
                      <span>Configure</span>
                    </button>
                    <button
                      onClick={() => onPauseUseCase(useCase)}
                      className="px-4 py-2 rounded-lg border border-orange-300 text-orange-700 hover:bg-orange-50 text-sm font-semibold transition-colors"
                    >
                      Pause
                    </button>
                  </>
                )}
                {!isActive && (
                  <button
                    onClick={() => onConfigureUseCase(useCase)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                  >
                    <Settings size={16} />
                    <span>Configure</span>
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Lead</p>
                <p className="text-3xl font-bold text-gray-900">{useCase.lead?.toLocaleString?.() || useCase.lead}</p>
                <div className="h-px bg-gray-200 mt-3" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-2">AIP</p>
                <p className="text-3xl font-bold text-gray-900">{useCase.aip}</p>
                <div className="h-px bg-gray-200 mt-3" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-2">COA</p>
                <p className="text-3xl font-bold text-gray-900">{useCase.coa}</p>
                <div className="h-px bg-orange-300 mt-3" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Target Achieved</p>
                <p className="text-3xl font-bold text-gray-900">
                  {useCase.targetAchieved}
                  {Number.isFinite(useCase.targetAchieved) ? '%' : ''}
                </p>
                <div className="mt-3 h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full bg-blue-700"
                    style={{ width: Number.isFinite(useCase.targetAchieved) ? `${useCase.targetAchieved}%` : '0%' }}
                    aria-label="Target achieved progress"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UseCaseList;
