# Product Application

This project of product service includes a frontend (Angular) and Tailwind, backend (Node.js), and MongoDB database, orchestrated with Docker Compose.

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

1. **Clone the Repository**
    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2. **Start the Services**
    ```bash
    docker-compose up -d
    ```

3. **Verify Ports**
    - Backend API: [http://localhost:3000](http://localhost:3000)
    - Frontend: [http://localhost:4200](http://localhost:4200)
    - MongoDB: Port 27017 (internal)

4. **Access the Application**
    - Frontend: [http://localhost:4200](http://localhost:4200)
    - Backend API: [http://localhost:3000/api](http://localhost:3000/api)

## Stopping the Services

```bash
docker-compose down
```