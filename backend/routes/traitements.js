var express = require('express');
var router = express.Router();

require('../models/connection');
const User = require('../models/users');
const Medicament = require('../models/medicaments');

// Créer un nouveau traitement
router.post('/', (req, res) => {
    const { userId, medicamentId, frequence, duree, rappel, instruction, qtDispo, qtRappel, areTaken } = req.body;
    User.findById(userId)
        .populate({
            path: 'traitements.medicaments',
            model: Medicament
        })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "Utilisateur non trouvé" });
            }
            const parsedFrequence = JSON.parse(frequence);
            const parsedDuree = JSON.parse(duree);
            const parsedRappel = JSON.parse(rappel);
            const parsedInstruction = JSON.parse(instruction);
            // let parseTaken = JSON.parse([areTaken])

            const startDate = new Date(parsedDuree.dateDebut);
            const endDate = new Date(parsedDuree.dateFin);
            const daysDifference = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;


            const newTreatment = {
                medicaments: medicamentId,
                frequence: parsedFrequence.frequence,
                duree: parsedDuree.duree,
                rappel: parsedRappel.rappel,
                instruction: parsedInstruction.instruction,
                qtDispo: qtDispo,
                qtRappel: qtRappel,
                isTook: false,
            }

            for (let i = 0; i < daysDifference; i++) {
                const currentDate = new Date(startDate);
                currentDate.setDate(startDate.getDate() + i);

                const priseTime = new Date(parsedRappel.heure);
                currentDate.setHours(priseTime.getHours(), priseTime.getMinutes(), priseTime.getSeconds());

                newTreatment.areTaken.push({ prise: currentDate, istaken: false });
            }

            user.traitements.push(newTreatment);

            user.save().then(newDoc => {
                // console.log(newDoc)
                res.status(201).json({ result: true, newDoc });
            })
                .catch(error => {
                    console.error(error);
                    res.status(500).json({ result: false });
                });
        });
})


// GET traitements/:traitementId/frequence
router.get('/:userId/frequence/:traitementId', async (req, res) => {
    try {
        const { userId, traitementId } = req.params;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        const traitement = user.traitements.id(traitementId);
        if (!traitement) {
            return res.status(404).json({ message: "Traitement non trouvé" });
        }

        res.status(200).json({ frequence: traitement.frequence });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
});




// Retourner tous les traitements du user
router.get('/:token', (req, res) => {

    const token = req.params.token;
    User.findOne({ token })
        .populate({
            path: 'traitements.medicaments', // Chemin à peupler
            model: Medicament // Nom du modèle à utiliser pour le peuplement
        })
        .then(user => {
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



// Modifier isTook d'un traitement

router.post('/markMedicationTaken', async (req, res) => {
    try {
        const { userId, treatmentId } = req.body;
        console.log(req.body)
        // Trouver l'utilisateur par son ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        // Trouver le traitement dans les traitements de l'utilisateur
        const traitement = user.traitements.id(treatmentId);
        if (!traitement) {
            return res.status(404).json({ message: "Traitement non trouvé" });
        }
        console.log(traitement)
        // Mettre à jour la propriété isTook du traitement
        traitement.isTook = true;

        // Récupérer le nombre de doses spécifié dans le schéma rappel
        const dosesPrises = traitement.rappel.dose;

        // Décrémenter qtDispo en fonction du nombre de doses prises
        if (traitement.qtDispo >= dosesPrises) {
            traitement.qtDispo -= dosesPrises;
        } else {
            // Gérer le cas où le nombre de doses prises est supérieur à la quantité disponible
            return res.status(400).json({ message: "La quantité disponible est insuffisante." });
        }

        // Sauvegarder les modifications de l'utilisateur
        await user.save();

        res.status(200).json({ message: "Médicament marqué comme pris avec succès." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la mise à jour du médicament pris." });
    }
});

router.delete('/', async (req, res) => {
    try {
        const { userId, treatmentId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "L'utilisateur n'a pas été trouvé" });
        }

        const treatmentIndex = user.traitements.findIndex(treatment => treatment._id == treatmentId);
        if (treatmentIndex === -1) {
            return res.status(404).json({ error: "Le traitement n'a pas été trouvé" });
        }

        user.traitements.splice(treatmentIndex, 1);

        await user.save();
        console.log('userId:', userId);
        console.log('treatmentId:', treatmentId);
        console.log('User:', user);
        console.log('Treatment index:', treatmentIndex);

        res.json({ message: "Traitement supprimé avec succès" });
    } catch (error) {
        console.error('Erreur lors de la suppression du traitement:', error);
        res.status(500).json({ error: "Erreur lors de la suppression du traitement" });
    }
});

module.exports = router;