import express from 'express';
import cors from 'cors';
import reservationRoutes from './routes/reservationRoutes';
import { PORT } from './constants';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/reservations', reservationRoutes);

// Test route to verify server is running
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
