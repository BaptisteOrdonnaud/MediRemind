const mongoose = require('mongoose');

const frequenceSchema = mongoose.Schema({
    lundi: Boolean,
    mardi: Boolean,
    mercredi: Boolean,
    jeudi: Boolean,
    vendredi: Boolean,
    samedi: Boolean,
    dimanche: Boolean,

});

const rappelSchema = mongoose.Schema({
    alert: Boolean,
    heure: Date,
    Dose: Number,
});

const dureeSchema = mongoose.Schema({
    dateDebut: Date,
    dateFin: Date,
});

const instructionSchema = mongoose.Schema({
    avantRepas: Boolean,
    pendantRepas: Boolean,
    apresRepas: Boolean,
    aJeun: Boolean,
    peuImporte: Boolean,
});
const traitementsSchema = mongoose.Schema({
    medicaments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'medicaments' }],
    frequence: [frequenceSchema],
    duree: [dureeSchema],
    rappel: [rappelSchema],
    instruction: [instructionSchema],
    qtDispo: Number,
    qtRappel: Number,
});

const userSchema = mongoose.Schema({
    nom: String,
    prenom: String,
    dateDeNaissance: Date,
    genre: String,
    email: String,
    password: String,
    telephone: Number,
    traitements: [traitementsSchema],
    token: String,
});

const User = mongoose.model('users', userSchema);

module.exports = User;