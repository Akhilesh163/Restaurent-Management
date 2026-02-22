import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../context/StroreContext';

const Verify = () => {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post(
          url + '/api/order/userorders',
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrders(response.data.data || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    if (token) fetchOrders();
  }, [token, url]);

  return (
    <div className="verify-orders" style={{ maxWidth: '700px', margin: '40px auto', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '12px', padding: '32px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#3399cc', fontWeight: 700, fontSize: '2rem' }}>Your Orders</h2>
        {Array.isArray(orders) && orders.filter(order => order.payment).length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888', fontSize: '1.1rem' }}>No successful paid orders found.</p>
        ) : (
          (() => {
            const paidOrders = orders.filter(order => order.payment);
            if (paidOrders.length === 0) return null;
            // Sort by date descending (most recent first)
            paidOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
            const recentOrder = paidOrders[0];
            return (
              <div key={recentOrder._id} style={{ margin: '0 auto', maxWidth: '500px', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '12px', padding: '32px', marginBottom: '24px' }}>
                <h3 style={{ color: 'green', textAlign: 'center', fontWeight: 700, fontSize: '1.5rem', marginBottom: '16px' }}>Order Successful!</h3>
                <div style={{ marginBottom: '12px' }}>
                  <strong>Items:</strong>
                  {recentOrder.items && recentOrder.items.map((item, idx) => (
                    <div key={idx} style={{ marginLeft: '12px', marginBottom: '6px', padding: '8px', background: '#f9f9f9', borderRadius: '6px' }}>
                      <span style={{ fontWeight: 500 }}>{item.name}</span> &nbsp;|&nbsp; 
                      Quantity: <span>{item.quantity}</span>
                      {item.price && (<span> &nbsp;|&nbsp; Price: ₹{item.price}</span>)}
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom: '12px' }}><strong>Amount:</strong> ₹{recentOrder.amount}</div>
                <div style={{ marginBottom: '12px' }}><strong>Address:</strong> {recentOrder.address && typeof recentOrder.address === 'object' ? Object.values(recentOrder.address).join(', ') : recentOrder.address}</div>
                <div style={{ marginBottom: '12px' }}><strong>Payment Status:</strong> <span style={{ color: 'green' }}>Paid</span></div>
              </div>
            );
          })()
        )}
    </div>
  );
};

export default Verify;