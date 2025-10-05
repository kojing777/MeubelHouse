<div align="center">
  
# 🪑 MeubelHouse - E-Commerce Furniture Store
</div>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-19.0.0-blue.svg">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-4.x-yellow.svg">
  <img alt="TailwindCSS" src="https://img.shields.io/badge/Tailwind-4.1.4-blue.svg">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-Express-green.svg">
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-Mongoose-darkgreen.svg">
  <img alt="License" src="https://img.shields.io/badge/License-ISC-lightgrey.svg">
</p>  

A **full-stack furniture e-commerce platform** with **modern UI, secure backend, and multiple payment integrations (Stripe, eSewa, COD)**. Built with **React, Node.js, Express, and MongoDB**, it provides a seamless experience for both **customers** and **sellers/admins**.


## 📸 Preview

  <img src="https://res.cloudinary.com/dp27ua535/image/upload/v1757215916/Screenshot_2025-09-07_091455_k50kfz.png" alt="MeubelHouse Preview" width="">
  <br />
  
## 🌟 Features

### 🛒 Customer Features

* Browse furniture categories (**Sofas, Tables, Beds, Office Furniture, etc.**)
* 🔍 Product search & filtering
* 🛍️ Shopping cart management
* 👤 User authentication & registration
* 📍 Address management
* 📦 Order tracking system
* 💳 Multiple payment options (**COD, Stripe, eSewa**)
* 📱 Fully responsive for all devices

### 👨‍💼 Seller / Admin Features

* 🔐 Seller authentication & access control
* ➕ Product management (**Add, Edit, Delete**)
* 📦 Stock & inventory management
* 📝 Order management dashboard
* 🖼️ Cloudinary integration for product images
* 📊 Sales analytics & performance insights

---

## 🚀 Tech Stack

### ⚛️ Frontend

* **React** 19.0.0 – UI library
* **Vite** – Fast build tool
* **Tailwind CSS** 4.1.4 – Styling
* **React Router DOM** 7.5.1 – Client-side routing
* **Axios** – API calls
* **Framer Motion** – Animations
* **React Hot Toast** – Notifications
* **React Icons** – Icon set

### 🛠️ Backend

* **Node.js** – Runtime
* **Express** 5.1.0 – Framework
* **MongoDB + Mongoose** – Database
* **JWT** – Authentication
* **bcryptjs** – Password hashing
* **Cloudinary** – Image storage
* **Multer** – File uploads
* **Stripe** – Payment gateway
* **eSewa** – Nepali payment gateway
* **CORS** – Cross-origin requests

---

## 📁 Project Structure

```bash
MeubelHouse/
├── Backend/
│   ├── Server.js
│   ├── configs/        # Cloudinary, DB, Multer
│   ├── controllers/    # User, Seller, Product, Order, Payment
│   ├── middlewares/    # Auth middlewares
│   ├── models/         # User, Product, Order, Address
│   └── routes/         # API routes
└── Frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── Context/    # Global state
    │   ├── Components/ # UI components
    │   ├── pages/      # Pages (Home, Cart, Orders, Seller, etc.)
    │   └── assets/
    ├── public/
    └── vite.config.js
```

---

## 🛠️ Installation & Setup

### ✅ Prerequisites

* Node.js (v16+)
* MongoDB instance
* Cloudinary account
* Stripe account (for payments)

### 🔧 Backend Setup

```bash
# Clone repository
git clone https://github.com/kojing777/MeubelHouse.git
cd MeubelHouse/Backend

# Install dependencies
npm install
```

Create a `.env` file:

```env
JWT_SECRET=your_jwt_secret
NODE_ENV=development

SELLER_EMAIL=your_admin_email@gmail.com
SELLER_PASSWORD=your_admin_password

MONGODB_URI=your_mongodb_uri

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

STRIPE_SECRET_KEY=your_stripe_secret
```

Run backend:

```bash
npm run server
```

### 🎨 Frontend Setup

```bash
cd ../Frontend
npm install
```

Create `.env` in `Frontend/`:

```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

---

## 🚀 Deployment

* **Backend:** [Render](https://render.com/)
* **Frontend:** [Vercel](https://vercel.com/)

Steps:

* Set environment variables
* Configure build commands (`npm run build`)
* Output directory: `dist`

---

## 🎯 Usage

### 👥 Customer Journey

1. Browse products
2. Add to cart
3. Register/Login
4. Add address
5. Place order (choose payment method)
6. Track order

### 👨‍💼 Seller Journey

1. Login
2. Add/manage products
3. Track & process orders
4. View analytics

---

## 🔑 API Endpoints

### 👤 User

* `POST /api/user/register` – Register
* `POST /api/user/login` – Login
* `GET /api/user/logout` – Logout
* `GET /api/user/is-auth` – Auth check

### 📦 Product

* `GET /api/product/list` – All products
* `POST /api/product/add` – Add product (Admin only)
* `POST /api/product/stock` – Update stock (Admin only)

### 🛍️ Order

* `POST /api/order/cod` – Cash on Delivery
* `POST /api/order/stripe` – Stripe order
* `GET /api/order/user` – User orders
* `GET /api/order/seller` – Seller orders

### 🛒 Cart

* `POST /api/cart/update` – Update cart

### 📍 Address

* `POST /api/address/add` – Add address
* `GET /api/address/get` – Get addresses

---

## 🤝 Contributing

1. Fork repo
2. Create feature branch → `git checkout -b feature/amazing-feature`
3. Commit → `git commit -m "Add amazing feature"`
4. Push → `git push origin feature/amazing-feature`
5. Open PR 🎉

---

## 📝 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Author

**Bijaya Moktan**

* GitHub: [@kojing777](https://github.com/kojing777)
* Email: [kojingmoktan92@gmail.com](mailto:kojingmoktan92@gmail.com)

---

## 🙏 Acknowledgments

* React ⚛️
* Tailwind CSS 🎨
* Cloudinary ☁️
* Stripe 💳
* MongoDB 🍃

---

⭐ **Star this repo if you found it useful!**
