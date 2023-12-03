import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('desde la api/usuarios');
});

export default router