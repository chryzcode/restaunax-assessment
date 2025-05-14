const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const menuItems = [
  { name: 'Margherita Pizza', price: 15.99 },
  { name: 'Pepperoni Pizza', price: 17.99 },
  { name: 'Caesar Salad', price: 8.99 },
  { name: 'Garlic Bread', price: 4.99 },
  { name: 'Pasta Carbonara', price: 14.99 },
  { name: 'Chicken Wings', price: 12.99 },
  { name: 'Tiramisu', price: 6.99 },
  { name: 'Coca Cola', price: 2.99 },
];

const statuses = ['PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'DELIVERED', 'COMPLETED'];
const orderTypes = ['DELIVERY', 'PICKUP'];

function getRandomItems() {
  const numItems = Math.floor(Math.random() * 3) + 1;
  const items = [];
  for (let i = 0; i < numItems; i++) {
    const menuItem = menuItems[Math.floor(Math.random() * menuItems.length)];
    items.push({
      name: menuItem.name,
      quantity: Math.floor(Math.random() * 2) + 1,
      price: menuItem.price,
      specialInstructions: Math.random() > 0.7 ? 'Extra cheese please' : '',
    });
  }
  return items;
}

function calculateTotal(items) {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

async function main() {
  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();

  // Generate 50 sample orders
  for (let i = 0; i < 50; i++) {
    const items = getRandomItems();
    const total = calculateTotal(items);
    const createdAt = new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)); // Random date within last week
    const scheduledFor = Math.random() > 0.7 ? new Date(createdAt.getTime() + Math.floor(Math.random() * 24 * 60 * 60 * 1000)) : null;

    await prisma.order.create({
      data: {
        customerName: `Customer ${i + 1}`,
        customerEmail: `customer${i + 1}@example.com`,
        orderType: orderTypes[Math.floor(Math.random() * orderTypes.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        total,
        createdAt,
        scheduledFor,
        preparationNotes: Math.random() > 0.8 ? 'Handle with care' : '',
        items: {
          create: items,
        },
      },
    });
  }

  console.log('Database has been seeded! 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
