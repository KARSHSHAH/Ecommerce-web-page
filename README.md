# React E-Commerce Store

A complete, responsive, and aesthetic e-commerce store built entirely with React (no backend required). 

## 🚀 Live Demo
**[Click here to view the live demo on Netlify](https://ecommerce-web-page-karsh.netlify.app/)** *(Note: Replace with your actual Netlify link after deployment if different)*

## ✨ Features
- **Frontend Only:** Built with React Functional Components & Hooks
- **Global State:** Managed via Context API & `useReducer`
- **Routing:** React Router v6
- **Data Persistence:** Cart, Wishlist, and Auth persisted via `localStorage`
- **Premium UI:** Custom CSS with modern variables, gradients, and micro-animations
- **Features:** 
  - Dynamic Cart & Checkout (protected route)
  - Wishlist management
  - Fake Auth system
  - Product filtering, searching (debounced), and sorting

## 🛠️ Setup Instructions
1. Clone the repository
2. Run `npm install`
3. Run `npm run dev` to start the development server

## 🚀 Deployment (Netlify)
1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click **Add new site** > **Import an existing project**
3. Select **GitHub** and authorize.
4. Choose the `Ecommerce-web-page` repository.
5. Build Settings (Netlify should auto-detect):
   - Build Command: `npm run build`
   - Publish directory: `dist`
6. Click **Deploy Site**!

To ensure React Router works correctly on Netlify, create a `public/_redirects` file in your code with the following content:
`/* /index.html 200` (I have already added this to your public folder!).
