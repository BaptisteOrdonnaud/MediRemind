import React, { useEffect, useState, useRef } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import { Linking } from 'react-native';
import { Platform } from 'react-native';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome2 from 'react-native-vector-icons/FontAwesome6';


const API_KEY = 'AIzaSyALGhtLR_EbOr_YXherjdRyhHGw2yuaJ3M';

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Rayon de la Terre en kilomètres
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
};

const MapScreen = () => {
  const user = useSelector((state) => state.user.value);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [nearbyPharmacies, setNearbyPharmacies] = useState([]);
  const mapRef = useRef(null); // Référence à la carte

  const getNearbyPharmacies = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=pharmacy&key=${API_KEY}`
      );

      setNearbyPharmacies(response.data.results);
    } catch (error) {
      // console.error('Error fetching nearby pharmacies', error);
    }
  };

  const handleMarkerPress = (pharmacy) => {
    // Ici, vous pouvez mettre en œuvre la logique pour afficher la page de la pharmacie
    // console.log('Pharmacy selected:', pharmacy);

    // Calculer la distance entre la pharmacie et la position actuelle de l'utilisateur
    const distance = calculateDistance(
      currentPosition.latitude,
      currentPosition.longitude,
      pharmacy.geometry.location.lat,
      pharmacy.geometry.location.lng
    );

    // Afficher la distance dans la console
    // console.log(`Distance to pharmacy: ${distance} km`);
  };

  useEffect(() => {
    (async () => {
      const result = await Location.requestForegroundPermissionsAsync();
      const status = result?.status;

      if (status === 'granted') {
        Location.watchPositionAsync({ distanceInterval: 10 },
          (location) => {
            setCurrentPosition(location.coords);
            getNearbyPharmacies(location.coords.latitude, location.coords.longitude);
            // Centrer la carte sur la position actuelle de l'utilisateur au chargement initial
            if (mapRef.current) {
              mapRef.current.animateToRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              });
            }
          });
      }
    })();
  }, [user]);

  const openMaps = (pharmacy) => {
    const { geometry } = pharmacy;
    const lat = geometry.location.lat;
    const lng = geometry.location.lng;
    const label = pharmacy.name;
    const url = Platform.select({
      ios: `http://maps.apple.com/?ll=${lat},${lng}&q=${label}`,
      android: `geo:${lat},${lng}?q=${label}`,
    });

    Linking.openURL(url);
  };

  return (
    <MapView ref={mapRef} mapType="hybrid" style={{ flex: 1 }}>
      {currentPosition && <Marker coordinate={currentPosition} title="Ma position" pinColor="#fecb2d" />}
      {nearbyPharmacies.map((pharmacy, index) => (
        <Marker 
          key={index}
          coordinate={{
            latitude: pharmacy.geometry.location.lat,
            longitude: pharmacy.geometry.location.lng,
          }}
          title={pharmacy.name}
          description={pharmacy.vicinity}
          onPress={() => handleMarkerPress(pharmacy)}
        >
          <Callout>
            <View style={styles.pharmacyContainer}>
                <Text style={styles.pharmacyName}>{pharmacy.name}</Text>

                  <View style={styles.infoContainer}>
                    <FontAwesome name='map-marker' style={styles.icon} />
                    <Text style={styles.pharmacyAdress}>{pharmacy.vicinity}</Text>
                  </View>

                  <View style={styles.infoContainer}>
                  <FontAwesome2 name='route' style={styles.icon} />
                <Text style={styles.pharmacyDistance}>{`Distance: ${calculateDistance(
                  currentPosition.latitude,
                  currentPosition.longitude,
                  pharmacy.geometry.location.lat,
                  pharmacy.geometry.location.lng
                ).toFixed(2)} km`}</Text>
                  </View>

                  <View style={styles.infoContainer}>
                  {pharmacy.rating && (<FontAwesome name='star' style={styles.icon} />)}
                  {pharmacy.rating && (
        <Text style={styles.pharmacyNote}> {`Note: ${pharmacy.rating}`}</Text>
      )}
                  </View>

              
                <TouchableOpacity style={styles.mapsButton} onPress={() => openMaps(pharmacy)}>
                  <Text style={styles.mapsText}>Ouvrir dans Maps</Text>
                </TouchableOpacity>
            </View>
          </Callout>
        </Marker>
      ))}
    </MapView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
  },
  pharmacyContainer: {
    flex: 1,
    padding: 10,
    // backgroundColor: 'red',
  },
  pharmacyName : {
    textAlign: 'center',
    fontWeight: '700',
    color: '#7368BF',
    marginBottom: 15,
    fontSize: 16
  }, 
  pharmacyAdress: {
  },
  mapsButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7368BF',
    paddingVertical: 10,
    borderRadius: 10,
  },
  mapsText : {
    color: '#fff',
    fontWeight: '600',
  },
  icon:{
    color:'#A69AFC',
    fontSize:20,
    marginRight: 10,
    },
    infoContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 15,
    }
});
