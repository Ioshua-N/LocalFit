import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
} from 'expo-location';
import MapViewDirections from 'react-native-maps-directions'; // Importe a biblioteca de direções

import data from '../../assets/data.json';

export default function Map() {
  const [location, setLocation] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const mapRef = useRef(null);

  async function requestLocationPermission() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
      setSelectedMarker(currentPosition);
    }
  }

  useEffect(() => {
    const setupMap = async () => {
      await requestLocationPermission();
      watchPositionAsync(
        {
          accuracy: LocationAccuracy.Highest,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (response) => {
          setLocation(response);
        }
      );
    };
    setupMap();
  }, []);

  const onMapLayout = () => {
    if (location && mapRef.current) {
      mapRef.current.animateCamera({
        center: selectedMarker ? selectedMarker.coords : location.coords,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  };

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
    setDestinationCoords({
      latitude: marker[data.fields.findIndex((field) => field.id === 'latitude')],
      longitude: marker[data.fields.findIndex((field) => field.id === 'longitude')],
    });
  };

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          onLayout={onMapLayout}
        >
          <MapViewDirections
            origin={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            destination={destinationCoords}
            apikey="AIzaSyDYEyjNy6OTaShKKB0tBFlx0yEJ9oR8bIQ"
            strokeWidth={3}
            strokeColor="hotpink"
          />

          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Você está aqui"
            pinColor="#025BAD"
            onPress={() => handleMarkerPress(location)}
          />

          {data.records.map((item) => (
            <Marker
              key={item[0]}
              coordinate={{
                latitude: item[data.fields.findIndex((field) => field.id === 'latitude')],
                longitude: item[data.fields.findIndex((field) => field.id === 'longitude')],
              }}
              title={item[data.fields.findIndex((field) => field.id === 'nome_oficial')]}
              description={item[data.fields.findIndex((field) => field.id === 'tipo_servico')]}
              onPress={() => handleMarkerPress(item)}
            >
              <Callout>
                <View>
                  <Text style={styles.calloutTitle}>
                    {item[data.fields.findIndex((field) => field.id === 'nome_oficial')]}
                  </Text>
                  <Text style={styles.calloutText}>
                    {item[data.fields.findIndex((field) => field.id === 'tipo_servico')]}
                  </Text>
                  <Text style={styles.calloutText}>
                    {item[data.fields.findIndex((field) => field.id === 'como_usar')]}
                  </Text>
                  <Text style={styles.calloutText}>
                    {item[data.fields.findIndex((field) => field.id === 'horario')]}
                  </Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  calloutText: {
    marginBottom: 8,
  },
});