# Wasaly

An E-commerce Fullstack app using MERN stack technologies

## Features

- Login & Register Users - JWT Authentication.
- Email verification.
- View categories and products.
- Custom permissions set for necessary endpoints.
- Image Upload and image processing.
- Add to cart functionality
- Product Filtering functionality
- Credit card payment with stripe.
- Awesome modern minimalist UI

## Technologies

### Backend:

- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Mongoose](https://mongoosejs.com/)
- [Nodemailer](https://nodemailer.com/)
- [Multer](https://github.com/expressjs/multer)
- [JWT](https://jwt.io/)
- [Sharp](https://sharp.pixelplumbing.com/)
- [Stripe](https://stripe.com/)

### Frontend:

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux_Toolkit](https://redux-toolkit.js.org/)
- [Tailwind](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Axios](https://www.axios.com/)
- [React_Hook_Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

# Backend Configurations

After clonning the repo you need to create .env file

```bash
cd food-delivery-app/server
touch .env
```

## MongoDB

- You need to create a Database, my choice here was to create account on [atlas](https://www.mongodb.com/atlas/database) for cloud database service.
- in .env file :

```bash
PORT = XXXX
NODE_ENV = development | test | production
MONGO_URI = mongodb+srv://<username>:<password>@cluster0.t8sswhx.mongodb.net/<databaseName>?retryWrites=true&w=majority
BASE_URL = <webiste_url>
```

## Brevo

- Brevo is great choice for development apps as they offer a great free tier of 300 emails per day, it is very easy to setup and I followed this guide [here](https://www.programonaut.com/how-to-send-an-email-in-node-js-using-an-smtp-step-by-step/)
- in .env file:

```bash
EMAIL_HOST = smtp-relay.brevo.com
EMAIL_PORT = 587
EMAIL_USER = <Your email in brevo website>
EMAIL_PASSWORD = <STMP Key>
```

## Stripe

- We need a payment gateway for Credit card payment and stripe one of the best choices here, you need to create account there.
- in .env file:

```bash
STRIPE_SECRET_KEY = <Your Strip Key>
STRIPE_WEBHOOK_SECRET = <Webhook Secret>
```

# Installation

```bash
npm install
```

# Building

```bash
npm run dev
```
