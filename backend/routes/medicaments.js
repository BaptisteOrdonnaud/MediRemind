const express = require('express');
const router = express.Router();
const Medicament = require('../models/medicaments');
const User = require('../models/users')

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


router.get('/stocks-medicament/:medicamentId', async (req, res) => {
    try {

        const medicamentId = req.params.medicamentId;

        const user = await User.findOne({ 'traitements.medicaments': medicamentId });

        if (!user) {
            return res.status(404).json({ message: 'Médicament non trouvé' });
        }

        const traitement = user.traitements.find(traitement => traitement.medicaments.includes(medicamentId));

        res.json({ qtDispo: traitement.qtDispo });
    } catch (error) {
        console.error('Erreur lors de la récupération des stocks de médicament : ', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

router.get('/addList', async (req,res) => {

});


module.exports = router;
