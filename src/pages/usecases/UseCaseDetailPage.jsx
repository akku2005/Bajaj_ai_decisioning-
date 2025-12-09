import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUseCaseStore } from '../../stores/useCaseStore';
import UseCaseDetail from './UseCaseDetail';

const UseCaseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const getUseCaseById = useUseCaseStore((state) => state.getUseCaseById);
  const useCase = getUseCaseById(id);

  if (!useCase) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-800 font-semibold mb-4">Use case not found.</p>
        <button
          onClick={() => navigate('/use-cases')}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Back to Use Cases
        </button>
      </div>
    );
  }

  return (
    <UseCaseDetail
      useCase={useCase}
      onBack={() => navigate('/use-cases')}
      onEdit={(uc) => navigate(`/use-cases/${uc.id}/configure`)}
    />
  );
};

export default UseCaseDetailPage;
