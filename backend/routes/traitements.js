var express = require('express');
var router = express.Router();

require('../models/connection');
const User = require('../models/users');
const Medicament = require('../models/medicaments');

// Créer un nouveau traitement
router.post('/', (req, res) => {
    const { userId, frequence, duree, rappel, instruction, qtDispo, qtRappel } = req.body;

    User.findById(userId)
        .then(user => {
            console.log('user:', user.nom)
            if (!user) {
                return res.status(404).json({ message: "Utilisateur non trouvé" });
            }

            const newTreatment = {
                frequence: JSON.parse(frequence),
                duree: JSON.parse(duree),
                rappel: JSON.parse(rappel),
                instruction: JSON.parse(instruction),
                qtDispo: qtDispo,
                qtRappel: qtRappel
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
router.get('/', (req, res) => {
    User.find({ traitements: req.body.traitements }).populate('medicaments')
        .then(traitement => {
            res.json({ traitements: traitement });
        });
});






module.exports = router;