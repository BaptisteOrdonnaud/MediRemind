import React, { useEffect, useState, useRef } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import axios from 'axios';

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
      console.error('Error fetching nearby pharmacies', error);
    }
  };

  const handleMarkerPress = (pharmacy) => {
    // Ici, vous pouvez mettre en œuvre la logique pour afficher la page de la pharmacie
    console.log('Pharmacy selected:', pharmacy);

    // Calculer la distance entre la pharmacie et la position actuelle de l'utilisateur
    const distance = calculateDistance(
      currentPosition.latitude,
      currentPosition.longitude,
      pharmacy.geometry.location.lat,
      pharmacy.geometry.location.lng
    );

    // Afficher la distance dans la console
    console.log(`Distance to pharmacy: ${distance} km`);
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
            <Text>{pharmacy.name}</Text>
            <Text>{pharmacy.vicinity}</Text>
            <Text>{`Distance: ${calculateDistance(
              currentPosition.latitude,
              currentPosition.longitude,
              pharmacy.geometry.location.lat,
              pharmacy.geometry.location.lng
            ).toFixed(2)} km`}</Text>
            {/* Ajoutez d'autres informations de la pharmacie ici */}
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
  calloutContainer: {
    width: 200,
  },

  calloutText: {
    fontSize: 14,
    marginBottom: 5,
  },

  calloutImage: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
});
