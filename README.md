

## Prerequisites
- Node.js 18+
- MongoDB running locally or a connection string

## Setup

### Task-Monitor-Api
1. cd server
2. cp  .env
3. Fill MONGO_URI, JWT_SECRET, CORS_ORIGIN
4. npm install
5. npm run dev

### Task-Monitor-App
1. cd client
2. cp .env
3. Set VITE_API_URL (default http://localhost:4000)
4. npm install
5. npm run dev (Vite will run on http://localhost:5173)

## Usage
- Register a user (choose role user/admin).
- Login to receive JWT (stored in localStorage).
- Create tasks in "To Do".
- Drag tasks within a column or between columns.
- Real-time updates broadcast to all connected clients.
- Owner-only edits; admin can edit all.

## Notes
- Positions normalized per column. Reorders broadcast the entire column for consistency.
