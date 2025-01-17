# Product Application

This project of product service includes a frontend (Angular) and Tailwind, backend (Node.js), and MongoDB database, orchestrated with Docker Compose.

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

1. **Clone the Repository**
    ```bash
    git clone https://github.com/monnatdev/product-app.git
    cd product-app
    ```

2. **Start the Services**
    ```bash
    docker-compose up -d
    ```

## Ports and URLs

1. **Ports**
    - Backend API: [http://localhost:3000](http://localhost:3000)
    - Frontend: [http://localhost:4200](http://localhost:4200)
    - MongoDB: Port 27017 (internal)

2. **Access the Application**
    - Frontend: [http://localhost:4200](http://localhost:4200)
    - Backend API: [http://localhost:3000/api](http://localhost:3000/api)

## Alternative Flow

1. **Install Backend Dependencies**
    ```bash
    cd backend
    npm install
    ```

2. **Start MongoDB Service**
    ```bash
    docker-compose up -d mongodb
    ```

3. **Run Backend**
    ```bash
    npm run start:dev
    ```

4. **Install Frontend Dependencies**
    ```bash
    cd ../frontend
    npm install
    ```

5. **Run Frontend**
    ```bash
    ng serve --port 4200
    ```