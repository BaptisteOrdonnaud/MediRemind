import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: { token: null, prenom: null, nom: null, idUser: null, traitements: null, dateDeNaissance: null },
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
        traitements: (state, action) => {
            state.value.frequence = action.payload.frequence;
            state.value.duree = action.payload.duree;
            state.value.rappel = action.payload.rappel;
            state.value.instruction = action.payload.instruction;
            state.value.qtDispo = action.payload.qtDispo;
            state.value.qtRappel = action.payload.qtRappel;
            state.value.areTaken = action.payload.areTaken;
        },
        logout: (state) => {
            state.value.token = null;
            state.value.prenom = null;
            state.value.nom = null;
            state.value.idUser = null;
            state.value.traitements = null;
        },

    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;