const mongoose = require('mongoose');

const traitementsSchema = mongoose.Schema({
    medicaments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'medicaments' }],
    frequence: String,
    dose: Number,
    heure: Date,
    duree: String,
    rappel: Boolean,
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