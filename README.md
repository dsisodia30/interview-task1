# Reservation Statistics Web Application

A responsive web application that displays statistical overview of reservations, showing group size and reservation count based on weekday for a selected restaurant and time period.

## Tech Stack

- **Backend**: Node.js, Express, TypeScript, Prisma, SQLite
- **Frontend**: Angular, Chart.js, TypeScript

## Project Structure

```
.
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── constants/
│   │   ├── controllers/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.component.ts
│   │   │   ├── app.component.html
│   │   │   └── app.component.css
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css
│   ├── package.json
│   └── tsconfig.json
├── db/
│   └── sqlite.db
└── README.md
```

## Setup Instructions

### Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Generate Prisma client:
   ```
   npx prisma generate
   ```

4. Start the development server:
   ```
   npm run dev
   ```
   The server will run on http://localhost:3000

### Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```
   The application will run on http://localhost:4200

## Usage

1. Open the frontend in your browser.
2. Enter the Restaurant ID (e.g., 201216).
3. Select the Start Date and End Date for the time period.
4. Click "Load Statistics" to fetch and display the data.

## Code Quality

The code is written in TypeScript for type safety, follows modular architecture, and is clean and readable.
