
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../context/StroreContext';

const Myorders = () => {
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
        setOrders([]);
      }
    };
    if (token) fetchOrders();
  }, [token, url]);

  return (
    <div className="my-orders" style={{ maxWidth: '700px', margin: '40px auto', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '12px', padding: '32px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '24px', color: '#3399cc', fontWeight: 700, fontSize: '2rem' }}>Your Orders</h1>
      {Array.isArray(orders) && orders.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888', fontSize: '1.1rem' }}>No orders found.</p>
      ) : (
        <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse', fontSize: '1rem' }}>
          <thead>
            <tr style={{ background: '#f5f5f5', color: '#333' }}>
              <th style={{ padding: '12px', borderBottom: '2px solid #e0e0e0' }}>Items</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #e0e0e0' }}>Amount</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #e0e0e0' }}>Address</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #e0e0e0' }}>Payment</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                <td style={{ padding: '10px' }}>
                  {order.items && order.items.map((item, idx) => (
                    <div key={idx} style={{ marginBottom: '4px', color: '#444' }}>
                      <span style={{ fontWeight: 500 }}>{item.name}</span> x <span>{item.quantity}</span>
                      {item.price && (<span> &nbsp;|&nbsp; Price: ₹{item.price}</span>)}
                    </div>
                  ))}
                </td>
                <td style={{ padding: '10px', color: '#3399cc', fontWeight: 600 }}>₹{order.amount}</td>
                <td style={{ padding: '10px', color: '#666' }}>{order.address && typeof order.address === 'object' ? Object.values(order.address).join(', ') : order.address}</td>
                <td style={{ padding: '10px', fontWeight: 600 }}>{order.payment ? <span style={{ color: 'green' }}>✅ Paid</span> : <span style={{ color: 'red' }}>❌ Pending</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Myorders;
