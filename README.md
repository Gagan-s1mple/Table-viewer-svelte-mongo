# MongoDB Table Viewer

This project provides a simple web interface to view tables and columns of a MongoDB database. It consists of a Node.js backend using Express for the server and a Svelte frontend for the user interface.

## Features

- Retrieve a list of tables from the MongoDB database.
- View columns of a selected table.
- Fetch data from a selected table.

## Getting Started

1. Clone the repository: `git clone https://github.com/your-username/mongo-table-viewer.git`
2. Navigate to the project folder: `cd mongo-table-viewer`
3. Install dependencies for both backend and frontend:
   - For the backend, run `cd backend && npm install`
   - For the frontend, run `cd frontend && npm install`
4. Start the backend server: `cd backend && npm start`
5. Start the frontend development server: `cd frontend && npm run dev`
6. Open your browser and go to `http://localhost:5000` to access the Table Viewer.

## Backend

- **Node.js**: The backend is built using Node.js, Express, and the MongoDB Node.js driver.
- **Endpoints**:
  - `/tables`: Get a list of tables.
  - `/columns/:tableName`: Get columns for a specific table.
  - `/:tableName`: Get data for a specific table.

## Frontend

- **Svelte**: The frontend is built using the Svelte framework for a reactive user interface.
- **Features**:
  - Dropdown to select tables.
  - Display columns for the selected table.
  - Button to fetch data for the selected table.

