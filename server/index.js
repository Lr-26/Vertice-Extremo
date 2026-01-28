
import express from 'express';
import cors from 'cors';
import { expeditions } from './data/expeditions.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

import authRoutes from './routes/auth.js';
app.use('/api/auth', authRoutes);

// Routes
app.get('/', (req, res) => {
    res.send('Vértice Extremo API is running');
});

app.get('/api/expeditions', (req, res) => {
    res.json(expeditions);
});

app.get('/api/expeditions/:id', (req, res) => {
    const expedition = expeditions.find(e => e.id === req.params.id);
    if (!expedition) {
        return res.status(404).json({ message: 'Expedition not found' });
    }
    res.json(expedition);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
