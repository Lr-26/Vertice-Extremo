
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { expeditions } from './data/expeditions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

import authRoutes from './routes/auth.js';
app.use('/api/auth', authRoutes);

// API Routes
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

// Servir archivos estáticos del frontend (carpeta dist)
app.use(express.static(path.join(__dirname, '../dist')));

// Ruta catch-all para manejar React Router
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server unificado corriendo en puerto ${PORT}`);
});

