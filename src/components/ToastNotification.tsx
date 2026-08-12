import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ToastNotification: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <ToastContainer position="top-end" className="toast-floating p-3">
      <Toast className="gentleman-toast rounded-3" role="status" aria-live="polite">
        <Toast.Header closeButton={false} className="py-2 px-3">
          <CheckCircle className="gentleman-toast__title me-2 flex-shrink-0" size={18} />
          <strong className="gentleman-toast__title me-auto">GENTLEMAN · Thông báo</strong>
          <small className="gentleman-toast__time ms-3">Vừa xong</small>
        </Toast.Header>
        <Toast.Body className="py-3 px-3">
          {toastMessage}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};
