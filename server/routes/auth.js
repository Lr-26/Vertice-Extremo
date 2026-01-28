
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../database.js';

const router = express.Router();
const SECRET_KEY = 'tu_secreto_super_seguro'; // En producción esto va en .env

// Register
router.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

    db.run(query, [username, email, hashedPassword], function (err) {
        if (err) {
            console.error(err);
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ message: 'El usuario o correo ya existe' });
            }
            return res.status(500).json({ message: 'Error al registrar usuario' });
        }

        const token = jwt.sign({ id: this.lastID }, SECRET_KEY, { expiresIn: '24h' });
        res.status(201).json({ message: 'Usuario registrado exitosamente', token, user: { id: this.lastID, username, email } });
    });
});

// Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
        if (err) return res.status(500).json({ message: 'Error en el servidor' });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) return res.status(401).json({ message: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '24h' });
        res.json({ message: 'Login exitoso', token, user: { id: user.id, username: user.username, email: user.email } });
    });
});

export default router;
