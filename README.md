# 🛍️ Fullstack E-Commerce Platform

A modern, feature-rich e-commerce platform built with Angular and Node.js, offering a complete shopping experience with user authentication, product management, shopping cart, order processing, and an admin dashboard.

## 🌐 Live Demo

**Frontend:** [https://ecommerce-project-nti-frontend-2wtw.vercel.app/home](https://ecommerce-project-nti-frontend-2wtw.vercel.app/home)

## ✨ Features

### 🛒 Customer Features
- **User Authentication** - Secure registration and login with JWT tokens
- **Product Browsing** - Browse products by categories with detailed product pages
- **Shopping Cart** - Add, update, and remove items from cart
- **Order Management** - Place orders and track order history
- **User Account** - Manage profile and view order history
- **FAQ Section** - Get answers to common questions
- **Testimonials** - Read customer reviews and experiences

### 👨‍💼 Admin Dashboard
- **Product Management** - Create, read, update, and delete products
- **Category Management** - Organize products into categories
- **Order Management** - View and manage customer orders
- **User Management** - Monitor and manage user accounts
- **FAQ Management** - Add and manage frequently asked questions
- **Testimonial Management** - Moderate customer testimonials

## 🚀 Technology Stack

### Frontend
- **Framework:** Angular 20.3
- **Styling:** Bootstrap 5.3.8
- **State Management:** RxJS 7.8
- **Authentication:** JWT Decode
- **Language:** TypeScript 5.9

### Backend
- **Runtime:** Node.js
- **Framework:** Express 5.1
- **Database:** MongoDB with Mongoose 8.19
- **Authentication:** JWT (jsonwebtoken 9.0)
- **Security:** bcrypt 6.0
- **File Upload:** Multer 2.0
- **Logging:** Winston 3.18
- **Caching:** Node-Cache 5.1
- **Task Scheduling:** Node-Cron 4.2

## 📁 Project Structure

```
fullstack-Ecommerce-project/
├── E-commerce(backend)/          # Backend API
│   ├── config/                   # Configuration files
│   ├── controllers/              # Route controllers
│   ├── middlewares/              # Custom middlewares
│   ├── models/                   # MongoDB models
│   ├── routes/                   # API routes
│   ├── uploads/                  # Uploaded images
│   └── app.js                    # Entry point
│
└── frontend/front/               # Angular frontend
    ├── src/
    │   ├── app/
    │   │   ├── core/             # Core services and guards
    │   │   ├── dashboard/        # Admin dashboard components
    │   │   ├── layout/           # Public layout components
    │   │   ├── models/           # TypeScript interfaces
    │   │   └── ...               # Other components
    │   └── ...
    └── ...
```

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **MongoDB** (v4.4 or higher)
- **Angular CLI** (v20 or higher)

## 📥 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/rahmakorish/fullstack-Ecommerce-project---NTI.git
cd fullstack-Ecommerce-project---NTI-1
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd E-commerce(backend)

# Install dependencies
npm install

# Create .env file with the following variables:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/ecommerce
# JWT_SECRET=your_jwt_secret_key
# JWT_EXPIRE=7d

# Start the development server
npm start
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend/front

# Install dependencies
npm install

# Update environment files if needed
# frontend/front/enviroments/enviroment.ts
# frontend/front/enviroments/enviroment.prod.ts

# Start the development server
npm start
```

The frontend application will run on `http://localhost:4200`

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove item from cart

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details

### Users (Admin)
- `GET /api/users` - Get all users
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### FAQ
- `GET /api/faq` - Get all FAQs
- `POST /api/faq` - Create FAQ (Admin)
- `PUT /api/faq/:id` - Update FAQ (Admin)
- `DELETE /api/faq/:id` - Delete FAQ (Admin)

### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `POST /api/testimonials` - Create testimonial
- `PUT /api/testimonials/:id` - Update testimonial (Admin)
- `DELETE /api/testimonials/:id` - Delete testimonial (Admin)

## 🎨 Key Features Implementation

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (User/Admin)
- Protected routes with route guards
- Secure password hashing with bcrypt

### Product Management
- Image upload with Multer
- Category-based product organization
- Product search and filtering
- Detailed product views

### Shopping Cart
- Persistent cart storage
- Real-time cart updates
- Cart item quantity management
- Cart total calculations

### Order Processing
- Order creation and tracking
- Order history for users
- Admin order management
- Order status updates

## 🛡️ Security Features

- JWT token authentication
- Password encryption with bcrypt
- CORS protection
- Role-based authorization middleware
- Input validation and sanitization

## 🚀 Deployment

### Frontend (Vercel)
The frontend is deployed on Vercel and can be accessed at:
[https://rahmakorish-ecommerce-project-nti-f.vercel.app/home](https://rahmakorish-ecommerce-project-nti-f.vercel.app/home)

### Backend
The backend can be deployed on platforms like:
- Heroku
- Railway
- Render
- AWS
- DigitalOcean

## 📝 Development Notes

- The project uses Angular standalone components (Angular 20+)
- Backend uses ES6+ features with async/await
- MongoDB aggregation pipelines for complex queries
- Caching implemented for better performance
- Scheduled tasks with node-cron for maintenance

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is part of the NTI (National Telecommunication Institute) training program.

## 👤 Author

**Rahma Korish**

- GitHub: [@rahmakorish](https://github.com/rahmakorish)
- Project Link: [https://github.com/rahmakorish/fullstack-Ecommerce-project---NTI](https://github.com/rahmakorish/fullstack-Ecommerce-project---NTI)

## 🙏 Acknowledgments

- NTI (National Telecommunication Institute) for the training program
- Angular and Node.js communities for excellent documentation
- All contributors who helped improve this project

---

⭐ If you find this project useful, please consider giving it a star!
