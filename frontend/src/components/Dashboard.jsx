import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
} from '@mui/material';
import { format } from 'date-fns';
import axios from 'axios';

const statusColors = {
  PENDING: 'warning',
  CONFIRMED: 'info',
  PREPARING: 'primary',
  READY: 'success',
  DELIVERED: 'secondary',
  COMPLETED: 'default',
};

function Dashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalOrders, setTotalOrders] = useState(0);
  const [filters, setFilters] = useState({
    status: '',
    orderType: '',
    customerName: '',
  });

  const fetchOrders = async () => {
    try {
      const params = new URLSearchParams({
        page: page + 1,
        limit: rowsPerPage,
        ...filters,
      });
      const response = await axios.get(`http://localhost:3000/orders?${params}`);
      setOrders(response.data.orders);
      setTotalOrders(response.data.total);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, rowsPerPage, filters]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (field) => (event) => {
    setFilters((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
    setPage(0);
  };

  const handleRowClick = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Order Management Dashboard
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    select
                    label="Status"
                    value={filters.status}
                    onChange={handleFilterChange('status')}
                  >
                    <MenuItem value="">All</MenuItem>
                    {Object.keys(statusColors).map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    select
                    label="Order Type"
                    value={filters.orderType}
                    onChange={handleFilterChange('orderType')}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="DELIVERY">Delivery</MenuItem>
                    <MenuItem value="PICKUP">Pickup</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Customer Name"
                    value={filters.customerName}
                    onChange={handleFilterChange('customerName')}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Scheduled For</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow
                    key={order.id}
                    hover
                    onClick={() => handleRowClick(order.id)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.orderType}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        color={statusColors[order.status]}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      {format(new Date(order.createdAt), 'MMM d, yyyy HH:mm')}
                    </TableCell>
                    <TableCell>
                      {order.scheduledFor
                        ? format(new Date(order.scheduledFor), 'MMM d, yyyy HH:mm')
                        : '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalOrders}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
