const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
};

// GET /orders - List all orders with pagination and filtering
router.get('/orders', async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const filters = status ? { where: { status } } : {};
    const orders = await prisma.order.findMany({
      ...filters,
      skip: (page - 1) * limit,
      take: parseInt(limit, 10),
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// GET /orders/:id - Retrieve a specific order with details
router.get('/orders/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    next(error);
  }
});

// PATCH /orders/:id - Update order status and preparation notes
router.patch('/orders/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, preparationNotes } = req.body;
    const order = await prisma.order.update({
      where: { id },
      data: { status, preparationNotes },
    });
    res.json(order);
  } catch (error) {
    next(error);
  }
});

// POST /orders - Create a new order
router.post('/orders', async (req, res, next) => {
  try {
    const {
      customerName,
      customerEmail,
      orderType,
      items,
      status,
      total,
      scheduledFor,
      preparationNotes,
    } = req.body;

    const order = await prisma.order.create({
      data: {
        customerName,
        customerEmail,
        orderType,
        status,
        total,
        scheduledFor,
        preparationNotes,
        items: {
          create: items,
        },
      },
    });
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

router.use(errorHandler);

module.exports = router;
