// fonts.js
import * as Font from 'expo-font';

// Chargez vos polices ici
export const loadFonts = async () => {
    await Font.loadAsync({
        'OpenSans-Medium': require('./assets/fonts/OpenSans-Medium.ttf'),
        'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
        'OpenSans-SemiBold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
        'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),


        // Ajoutez d'autres polices et épaisseurs au besoin
    });
};

// Utilisez ces noms de polices dans votre application
export const openSans = {
    medium: 'OpenSans-Medium',
    regular: 'OpenSans-Regular',
    semibold: 'OpenSans-SemiBold',
    // Ajoutez d'autres polices et épaisseurs au besoin
};

export const poppins = {
    semibold: 'Poppins-SemiBold'
};
