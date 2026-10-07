import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { CheckCircle, XCircle } from 'lucide-react';

export default function Toast() {
  const { state } = useAppContext();

  if (!state.toast) return null;

  return (
    <div className={`toast toast--${state.toast.type}`}>
      {state.toast.type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
      <span>{state.toast.message}</span>
    </div>
  );
}
