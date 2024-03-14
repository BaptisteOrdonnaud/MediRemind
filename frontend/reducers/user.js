import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: { token: null, prenom: null, nom: null, idUser: null, traitements: null, dateDeNaissance: null, isLoaded: false, isTook: false },
    // traitement: { medicaments: null, frequence: null, duree: null, rappel: null, instruction: null, qtDispo: null, qtRappel: null, areTaken: null }
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.value.token = action.payload.token;
            state.value.prenom = action.payload.prenom;
            state.value.nom = action.payload.nom;
            state.value.idUser = action.payload.idUser;
            state.value.traitements = action.payload.traitements
            state.value.dateDeNaissance = action.payload.dateDeNaissance
        },
        enregistrerTraitements: (state, action) => {
            const { idMedoc, frequence, duree, rappel, instruction, qtDispo, qtRappel, areTaken } = action.payload;
            state.value.idMedoc = idMedoc;
            state.value.frequence = frequence;
            state.value.duree = duree;
            state.value.rappel = rappel;
            state.value.instruction = instruction;
            state.value.qtDispo = qtDispo;
            state.value.qtRappel = qtRappel;
            state.value.areTaken = areTaken;
        },
        enregistrerMedicament: (state, action) => {
            state.value.idMedoc = action.payload.idMedoc;
            state.value.nomMedoc = action.payload.nomMedoc;
        },
        enregistrerFrequence: (state, action) => {
            state.value.frequence = action.payload;
        },
        enregistrerDuree: (state, action) => {
            state.value.duree = action.payload;
        },
        enregistrerRappel: (state, action) => {
            state.value.rappel = action.payload;
        },
        enregistrerInstruction: (state, action) => {
            state.value.instruction = action.payload;
        },
        enregistrerQtDispo: (state, action) => {
            state.value.qtDispo = action.payload;
        },
        enregistrerQtRappel: (state, action) => {
            state.value.qtRappel = action.payload;
        },
        enregistrerAreTaken: (state, action) => {
            state.value.areTaken = action.payload;
        },


        logout: (state) => {
            state.value.token = null;
            state.value.prenom = null;
            state.value.nom = null;
            state.value.idUser = null;
            state.value.traitements = null;
        },
        updateIsLoaded: (state, action) => {
            state.value.isLoaded = action.payload
        },
        updateIsTook: (state, action) => {
            state.value.isTook = action.payload
        },

    },
});

export const { updateIsLoaded, login, logout, enregistrerTraitements, enregistrerDuree, enregistrerFrequence, enregistrerInstruction, enregistrerMedicament, enregistrerQtDispo, enregistrerQtRappel, enregistrerRappel, enregistrerAreTaken, updateIsTook, } = userSlice.actions;
export default userSlice.reducer;