const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Get all orders with pagination and filtering
app.get('/orders', async (req, res) => {
  try {
    const { page = 1, limit = 10, status, orderType, customerName } = req.query;
    const skip = (page - 1) * limit;

    const where = {};
    if (status) where.status = status;
    if (orderType) where.orderType = orderType;
    if (customerName) where.customerName = { contains: customerName, mode: 'insensitive' };

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: { items: true },
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.order.count({ where }),
    ]);

    res.json({
      orders,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific order
app.get('/orders/:id', async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: { items: true },
    });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status and preparation notes
app.patch('/orders/:id', async (req, res) => {
  try {
    const { status, preparationNotes } = req.body;
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: {
        status,
        preparationNotes,
      },
      include: { items: true },
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new order
app.post('/orders', async (req, res) => {
  try {
    const { customerName, customerEmail, orderType, items, total, scheduledFor, preparationNotes } = req.body;
    const order = await prisma.order.create({
      data: {
        customerName,
        customerEmail,
        orderType,
        total,
        scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
        preparationNotes,
        items: {
          create: items,
        },
      },
      include: { items: true },
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
