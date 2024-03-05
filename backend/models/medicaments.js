const mongoose = require('mongoose');

const medicamentSchema = mongoose.Schema({
    id: Number,
    product_name: String,
    form: String,
    administration_route: String,
    authorization_status: String,
    procedure_type: String,
    commercial_status: String,
    authorization_date: String,
    company: String,
    special_warning: String,
});

const Medicament = mongoose.model('medicaments', medicamentSchema);

module.exports = Medicament;