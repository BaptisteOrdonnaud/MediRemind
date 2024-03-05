const mongoose = require('mongoose');

const frequenceSchema = mongoose.Schema({
    combienParJour: Number,
    jourDeLaSemaine: Boolean,
});

const rappelSchema = mongoose.Schema({
    heure: Date,
    Dose: Number,
});

const traitementsSchema = mongoose.Schema({
    medicaments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'medicaments' }],
    frequence: [frequenceSchema],
    // dose: Number,
    // heure: Date,
    duree: String,
    rappel: [rappelSchema],
    instruction: Boolean,
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