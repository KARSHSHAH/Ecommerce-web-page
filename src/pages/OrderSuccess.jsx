import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function OrderSuccess() {
  const location = useLocation();
  const { orderId, total } = location.state || {};

  if (!orderId) {
    return <Navigate to="/" />;
  }

  return (
    <div className="order-success container">
      <div className="success-card">
        <CheckCircle size={80} className="success-icon" />
        <h1>Order Successful!</h1>
        <p>Thank you for your purchase.</p>
        
        <div className="order-details">
          <div className="detail-row">
            <span>Order ID:</span>
            <strong>{orderId}</strong>
          </div>
          <div className="detail-row">
            <span>Total Amount:</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
        </div>
        
        <Link to="/products" className="btn btn--primary">Continue Shopping</Link>
      </div>
    </div>
  );
}
