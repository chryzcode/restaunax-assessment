# Restaunax Order Management System

A full-stack order management system for restaurants, built with Node.js, Express, PostgreSQL, Prisma, React, and Material UI.

## Features

- Real-time order management dashboard
- Order status tracking and updates
- Filtering and search functionality
- Responsive design for desktop and mobile
- Detailed order view with item management
- Preparation notes and special instructions
- Real-time order updates using polling
- Intuitive UI with Material Design principles

## Tech Stack

### Backend
- Node.js with Express
- PostgreSQL database
- Prisma ORM for type-safe database operations
- RESTful API architecture
- Environment-based configuration
- Error handling middleware
- CORS support

### Frontend
- React with Material UI v5
- React Router v6 for navigation
- Axios for API communication
- Responsive design with mobile-first approach
- Custom hooks for data fetching
- Context API for state management
- Optimistic updates for better UX

## Architecture Overview

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  React Frontend │◄────┤  Express API    │◄────┤  PostgreSQL DB  │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │                       ▲
        │                       │                       │
        │                       │                       │
        ▼                       ▼                       │
┌─────────────────┐     ┌─────────────────┐            │
│                 │     │                 │            │
│  Material UI    │     │  Prisma ORM     │────────────┘
│  Components     │     │                 │
│                 │     │                 │
└─────────────────┘     └─────────────────┘
```

## Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- PostgreSQL (if running locally)
- Git

## Setup and Running

1. Clone the repository:
```bash
git clone <repository-url>
cd restaunax
```

2. Set up environment variables:
```bash
# Backend (.env)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/restaunax"
PORT=3000

# Frontend (.env)
VITE_API_URL=http://localhost:3000
```

3. Start the application using Docker Compose:
```bash
docker-compose up --build
```

This will start:
- Backend server on http://localhost:3000
- Frontend application on http://localhost:3001
- PostgreSQL database on port 5432

4. Initialize the database:
```bash
# Access the backend container
docker-compose exec backend sh

# Run database migrations
npm run prisma:migrate

# Seed the database with sample data
npm run prisma:seed
```

## Development

### Backend Development
```bash
cd backend
npm install
npm run dev
```

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

### Orders
- `GET /orders` - List all orders with pagination and filtering
  - Query params: `status`, `page`, `limit`
- `GET /orders/:id` - Get a specific order
- `PATCH /orders/:id` - Update order status and notes
- `POST /orders` - Create a new order

## Project Structure

```
restaunax/
├── backend/
│   ├── src/
│   │   ├── index.js          # Main application entry
│   │   ├── routes/           # API route handlers
│   │   ├── controllers/      # Business logic
│   │   └── middleware/       # Custom middleware
│   ├── prisma/
│   │   ├── schema.prisma     # Database schema
│   │   └── seed.js          # Seed data
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── OrderDetails.jsx
│   │   │   └── Navbar.jsx
│   │   ├── hooks/           # Custom React hooks
│   │   ├── context/         # React context providers
│   │   └── App.jsx
│   └── package.json
└── docker-compose.yml
```

## Technical Decisions and Reasoning

1. **Technology Choices**
   - **Node.js & Express**: Chosen for their simplicity, large ecosystem, and excellent performance for REST APIs
   - **PostgreSQL**: Selected for its reliability, ACID compliance, and robust querying capabilities
   - **Prisma**: Provides type safety and excellent developer experience with auto-generated types
   - **React**: Industry standard for building interactive UIs with a large ecosystem
   - **Material UI**: Offers pre-built components and theming capabilities for rapid development

2. **Architecture Decisions**
   - RESTful API design for simplicity and scalability
   - Separation of concerns between frontend and backend
   - Containerization with Docker for consistent development environments
   - Environment-based configuration for different deployment scenarios

## Future Improvements

1. **Technical Enhancements**
   - Implement WebSocket for real-time updates instead of polling
   - Add comprehensive error tracking and monitoring
   - Implement automated testing (unit, integration, and E2E)
   - Add API documentation using Swagger/OpenAPI

2. **Feature Additions**
   - User authentication and role-based access control
   - Kitchen display system (KDS) integration
   - Analytics dashboard for business insights
   - Mobile app for order management
   - Integration with POS systems
   - Print functionality for orders

3. **Performance Optimizations**
   - Implement caching strategies
   - Add database indexing for frequently queried fields
   - Optimize frontend bundle size
   - Implement lazy loading for components

## Challenges and Solutions

1. **Real-time Updates**
   - Challenge: Implementing real-time order updates without WebSocket
   - Solution: Implemented efficient polling with debouncing and optimistic updates

2. **Database Performance**
   - Challenge: Handling large datasets efficiently
   - Solution: Implemented pagination and proper indexing

3. **State Management**
   - Challenge: Managing complex state across components
   - Solution: Used React Context API for global state and local state for component-specific data

4. **Responsive Design**
   - Challenge: Ensuring consistent experience across devices
   - Solution: Implemented mobile-first design with Material UI's responsive components

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 