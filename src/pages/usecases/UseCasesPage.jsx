import React from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUseCaseStore } from '../../stores/useCaseStore';
import UseCaseList from './UseCaseList';

const UseCasesPage = () => {
  const navigate = useNavigate();
  const useCases = useUseCaseStore((state) => state.useCases);
  const updateUseCase = useUseCaseStore((state) => state.updateUseCase);

  const handlePause = (uc) => updateUseCase(uc.id, { status: 'Paused', pauseStatus: 'Configure' });
  const handleConfigure = (uc) => navigate(`/use-cases/${uc.id}/configure`);
  const handleEdit = (uc) => navigate(`/use-cases/${uc.id}`);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Use Case</h1>
          <p className="text-gray-600 mt-1">Manage active use cases and KPIs for your campaign.</p>
        </div>
        <button
          onClick={() => navigate('/use-cases/new')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Use Case</span>
        </button>
      </div>

      <UseCaseList
        useCases={useCases}
        onSelectUseCase={handleEdit}
        onConfigureUseCase={handleConfigure}
        onPauseUseCase={handlePause}
      />
    </div>
  );
};

export default UseCasesPage;
