var express = require('express');
var router = express.Router();

require('../models/connection');
const User = require('../models/users');
const Medicament = require('../models/medicaments');

// Créer un nouveau traitement

router.post('/', (req, res) => {
    const { userId, medicamentId, frequence, dose, heure, duree, rappel, instruction, qtDispo, qtRappel } = req.body;
    User.findById(userId).then(user => {
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        Medicament.findById(medicamentId).then(medicament => {
            if (!medicament) {
                return res.status(404).json({ message: "Medicament not found" });
            }

            const newTreatment = {
                medicaments: [medicamentId],
                frequence,
                dose,
                heure,
                duree,
                rappel,
                instruction,
                qtDispo,
                qtRappel
            };

            user.traitements.push(newTreatment);
            user.save().then(newDoc => {
                res.status(201).json({ message: "New treatment added successfully", newDoc });
            }).catch(error => {
                console.error(error);
                res.status(500).json({ message: "Internal server error" });
            });
        });
    }).catch(error => {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    });
});


// Retourner tous les traitements du user
router.get('/', (req, res) => {
    User.find({ traitements: req.body.traitements }).populate('medicaments')
        .then(traitement => {
            res.json({ traitements: traitement });
        });
});






module.exports = router;