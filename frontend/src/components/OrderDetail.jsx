import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper, Button, TextField } from '@mui/material';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = React.useState(null);

  React.useEffect(() => {
    // Fetch order details
    fetch(`/api/orders/${id}`)
      .then(response => response.json())
      .then(data => setOrder(data));
  }, [id]);

  if (!order) return <Typography>Loading...</Typography>;

  const handleStatusChange = (newStatus) => {
    // Update order status
    fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(response => response.json())
      .then(data => setOrder(data));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Order Details
      </Typography>
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h6">Customer: {order.customerName}</Typography>
        <Typography variant="body1">Email: {order.customerEmail}</Typography>
        <Typography variant="body1">Status: {order.status}</Typography>
        <Typography variant="body1">Total: ${order.total.toFixed(2)}</Typography>

        <TextField
          label="Update Status"
          select
          SelectProps={{ native: true }}
          value={order.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          fullWidth
          margin="normal"
        >
          {['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'completed'].map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </TextField>

        <Button variant="contained" color="primary" onClick={() => handleStatusChange('completed')}>
          Mark as Completed
        </Button>
      </Paper>
    </Container>
  );
};

export default OrderDetail;
