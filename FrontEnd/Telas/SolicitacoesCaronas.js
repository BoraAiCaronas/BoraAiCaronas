import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Dimensions } from "react-native";
import MapView from "react-native-maps";
import * as Location from 'expo-location';
import Axios from '../Comps/Axios';

const { height } = Dimensions.get('window');

const SolicitarCaronas = () => {
  const mapEl = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [rideRequests, setRideRequests] = useState([]);

  useEffect(() => {
    (async function () {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({ enabledHighAccuracy: true });
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01, // Delta do zoom do mapa em latitude
          longitudeDelta: 0.01, // Delta do zoom do mapa em longitude
        });
      } else {
        throw new Error('Permissão para localização negada!');
      }
    })();

    fetchRideRequests();
  }, []);

  const fetchRideRequests = async () => {
    try {
      const response = await Axios.get(`/corrida/`);
      console.log(response.data);
      const filteredRequests = response.data.filter(request => request.idUserMotorista === null);
      setRideRequests(filteredRequests);
    } catch (error) {
      console.error('Erro ao buscar as corridas:', error);
    }
  };

  const renderRideRequest = ({ item }) => (
    <TouchableOpacity style={styles.requestContainer}>
      <Text style={styles.requestText}>Usuário: {item.IdUserCorrida || 'Nome não disponível'}</Text>
      <Text style={styles.requestText}>Origem: {item.latitudeUserOrigem || 'Destino não disponível'}</Text>
      <Text style={styles.requestText}>Destino: {item.latitudeUserDestino || 'Destino não disponível'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={currentLocation}
        showsUserLocation={true}
        loadingEnabled={true}
        ref={mapEl}
      >
      </MapView>
      <View style={styles.slideBar}>
        <Text style={styles.slideBarTitle}>Solicitações</Text>
        <FlatList
          data={rideRequests}
          renderItem={renderRideRequest}
          keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start'
  },
  map: {
    width: "100%",
    height: height * 0.6, // 60% da altura da tela
    backgroundColor: '#203864'
  },
  slideBar: {
    height: height * 0.4, // 40% da altura da tela
    backgroundColor: '#203864',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 10,
    elevation: 5,
  },
  slideBarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff', // Altera a cor do título para branco
  },
  requestContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  requestText: {
    fontSize: 16,
    color: '#fff', // Altera a cor do texto para branco
  },
});

export default SolicitarCaronas;
