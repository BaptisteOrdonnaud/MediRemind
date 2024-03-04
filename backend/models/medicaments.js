
const medicamentSchema = mongoose.Schema({
    nom: String,
    dateDePeremption: Date,
    precautionsDemploi: String,
    modeDadministration: String,
});

const Medicament = mongoose.model('medicaments', medicamentSchema);