# Portfolio Tracker

A full-stack portfolio tracker application that allows users to manage their stock holdings, view their portfolio value, and track their top-performing stocks. Built with **React** for the frontend, **Express.js** and **Prisma ORM** for the backend, and **neonDB PostgreSQL** for the database.

---

## Features

### Backend
- **Express.js** server with RESTful APIs for CRUD operations on stocks.
- **Prisma ORM** for seamless database interactions.
- **PostgreSQL** for data storage.
- Comprehensive error handling and proper HTTP status codes.

### Frontend
- **React** application with a modern and responsive design using **Tailwind CSS**.
- **Dashboard**: Displays total portfolio value and the top-performing stock.
- **StockList**: Manage stock holdings (view, edit, and delete stocks).
- **StockForm**: Add or edit stock details.
- **React Router**: Smooth navigation across components.

### Database
- Hosted on **neonDB PostgreSQL**.
- Includes a `Stock` table for storing stock details.

---
## Running the Application with Docker

### 1. Install Docker and Docker Compose

Ensure you have **Docker** and **Docker Compose** installed on your machine. You can download them from the following links:
- **Docker**: [https://www.docker.com/get-started](https://www.docker.com/get-started)
- **Docker Compose**: [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

### 2. Clone the Repository

If you haven’t already cloned the repository, run the following command to do so:

```bash
git clone https://github.com/baldanaresh/Simple-Portfolio.git
cd Simple-Portfolio
```
### 3. Build and Run the Docker Container

 ```bash
  docker-compose up --build
 ```
---

## Setup Instructions

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v14+)
- **npm** or **yarn**
- **PostgreSQL** (neonDB setup recommended)
- **Prisma CLI**

---

### 1. Clone the Repository
```bash
git clone https://github.com/baldanaresh/Simple-Portfolio.git
cd Simple-Portfolio
```
## Backend Setup

2. **Install Dependencies**

```bash
cd backend
npm install
```
3. **Initialize Prisma**

Run the following commands to set up the database schema:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. **Start the Server**

```bash
npm start
```
## Frontend Setup

1. **Install Dependencies**

```bash
cd ../frontend
npm install
```

2. **Start the React Application**

```bash
npm start
```

The frontend will run on [http://localhost:5173](http://localhost:5173).

---



