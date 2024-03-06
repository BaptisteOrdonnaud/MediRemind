var express = require('express');
var router = express.Router();

require('../models/connection');
const User = require('../models/users');
const Medicament = require('../models/medicaments');

// Créer un nouveau traitement
router.post('/', (req, res) => {
    const { userId, medicamentId, frequence, duree, rappel, instruction, qtDispo, qtRappel } = req.body;

    User.findById(userId)
        .populate({
            path: 'traitements.medicaments', // Chemin à peupler
            model: Medicament // Nom du modèle à utiliser pour le peuplement
        })
        .then(user => {
            console.log('user:', user.nom)
            if (!user) {
                return res.status(404).json({ message: "Utilisateur non trouvé" });
            }

            const newTreatment = {
                medicaments: [medicamentId],
                frequence: JSON.parse(frequence),
                duree: JSON.parse(duree),
                rappel: JSON.parse(rappel),
                instruction: JSON.parse(instruction),
                qtDispo: qtDispo,
                qtRappel: qtRappel,
                isTook: false
            }

            console.log('newTreatment:', newTreatment)

            user.traitements.push(newTreatment);
            user.save().then(newDoc => {
                res.status(201).json({ message: "Nouveau traitement ajouté avec succès", newDoc });
            })
                .catch(error => {
                    console.error(error);
                    res.status(500).json({ message: "Erreur interne du serveur" });
                });
        });
})


//Rappel de prise de médicament
router.get('/alert', (req, res) => {
    const alertMessage = "Ceci est un message d'alerte!";

    const response = {
        alert: alertMessage
    };

    // Envoyer la réponse JSON
    res.json(response);
});

// router.post('/', (req, res) => {
//     const { userId, medicamentId, frequence, dose, heure, duree, rappel, instruction, qtDispo, qtRappel } = req.body;

//     User.findById(userId)
//         .populate({
//             path: 'traitements.medicaments', // Chemin à peupler
//             model: Medicament // Nom du modèle à utiliser pour le peuplement
//         })
//         .then(user => {
//             console.log('user:', user.nom)
//             if (!user) {
//                 return res.status(404).json({ message: "Utilisateur non trouvé" });
//             }

//             Medicament.findById(medicamentId)
//                 .then(medicament => {
//                     console.log('medicament:', medicament)

//                     if (!medicament) {
//                         return res.status(404).json({ message: "Médicament non trouvé" });
//                     }

//                     const newTreatment = {
//                         medicaments: [medicamentId],
//                         frequence,
//                         dose,
//                         heure,
//                         duree,
//                         rappel,
//                         instruction,
//                         qtDispo,
//                         qtRappel
//                     }

//                     console.log('newTreatment:', newTreatment)

//                     user.traitements.push(newTreatment);
//                     user.save().then(newDoc => {
//                         res.status(201).json({ message: "Nouveau traitement ajouté avec succès", newDoc });
//                     })
//                         .catch(error => {
//                             console.error(error);
//                             res.status(500).json({ message: "Erreur interne du serveur" });
//                         });
//                 });
//         }).catch(error => {
//             console.error(error);
//             res.status(500).json({ message: "Erreur interne du serveur" });
//         });
// });


// Retourner tous les traitements du user
router.get('/:token', (req, res) => {

    const token = req.params.token;
    User.findOne({ token })
        .populate({
            path: 'traitements.medicaments', // Chemin à peupler
            model: Medicament // Nom du modèle à utiliser pour le peuplement
        })
        .then(user => {
            console.log('test', user)
            if (!user) {
                return res.status(404).json({ message: "Utilisateur non trouvé." });
            }

            res.json({ traitements: user.traitements });
        })
        .catch(err => {
            console.error("Erreur lors de la recherche de l'utilisateur:", err);
            res.status(500).json({ message: "Erreur lors de la recherche de l'utilisateur." });
        });
});






module.exports = router;