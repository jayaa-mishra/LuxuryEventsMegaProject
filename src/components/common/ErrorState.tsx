import React from 'react';

interface ErrorStateProps {
  message?: string;
  retry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message = 'An error occurred', retry }) => (
  <div className="text-center py-12 text-red-500">
    <p className="mb-4">{message}</p>
    {retry && (
      <button onClick={retry} className="px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition">
        Try Again
      </button>
    )}
  </div>
);
