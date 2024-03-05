const express = require('express');
const router = express.Router();
const Medicament = require('../models/medicaments');

router.get('/:searchQuery', async (req, res) => {
    try {
        const { searchQuery } = req.params;

        if (searchQuery.length < 3) {
            return res.status(400).json({ message: 'La requête doit contenir au moins 3 caractères.' });
        }

        const results = await Medicament.find({ product_name: new RegExp(`^${searchQuery}`, 'i') }).limit(10);

        res.json(results);
    } catch (error) {
        console.error('Erreur lors de la recherche de médicaments :', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});

module.exports = router;
