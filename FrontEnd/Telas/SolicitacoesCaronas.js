import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Dimensions, Alert } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from 'expo-location';
import Axios from '../Comps/Axios';
import MapViewDirections from 'react-native-maps-directions';
import config from '../config/index.json';
import CustomAlert from "../Comps/CustomAlert"; // Importar o componente CustomAlert

const { height } = Dimensions.get('window');

const SolicitarCaronas = () => {
  const mapEl = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [rideRequests, setRideRequests] = useState([]);
  const [destination, setDestination] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null); // Estado para armazenar a corrida selecionada
  const [isAlertVisible, setAlertVisible] = useState(false); // Estado para controlar a visibilidade do CustomAlert

  useEffect(() => {
    (async function () {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({ enabledHighAccuracy: true });
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } else {
        throw new Error('Permissão para localização negada!');
      }
    })();

    fetchRideRequests();
  }, []);

  const fetchUserName = async (userId) => {
    if (!userId) {
      console.error('Erro: userId indefinido');
      return 'Nome não disponível';
    }
    try {
      const response = await Axios.get(`/user/${userId}`);
      return response.data.nome; // Ajuste o nome do campo conforme necessário
    } catch (error) {
      console.error(`Erro ao buscar o nome do usuário com id ${userId}:`, error);
      return 'Nome não disponível';
    }
  };

  const fetchRideRequests = async () => {
    try {
      const response = await Axios.get(`/corrida/`);
      const filteredRequests = response.data.filter(request => request.idUserMotorista === null);

      const requestsWithUserNames = await Promise.all(filteredRequests.map(async (request) => {
        if (!request.IdUserCorrida) {
          console.error('Erro: idUserCorrida indefinido', request);
          return { ...request, nome: 'Nome não disponível' };
        }
        const nome = await fetchUserName(request.IdUserCorrida);
        return { ...request, nome };
      }));

      setRideRequests(requestsWithUserNames);
    } catch (error) {
      console.error('Erro ao buscar as corridas:', error);
    }
  };

  const handleRequestPress = async (request) => {
    if (!currentLocation) {
      Alert.alert('Erro', 'Localização atual não disponível. Por favor, tente novamente mais tarde.');
      return;
    }

    const origin = {
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    const destination = {
      latitude: parseFloat(request.latitudeUserOrigem),
      longitude: parseFloat(request.longitudeUserOrigem),
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
      endereco: request.endereco
    };

    mapEl.current.fitToCoordinates([origin, destination], {
      edgePadding: {
        top: 100,
        right: 100,
        bottom: 100,
        left: 100
      }
    });

    // Definir destino no estado para exibição na interface
    setDestination(destination);
    setSelectedRequest(request);
    setAlertVisible(true); // Mostrar o CustomAlert ao selecionar a corrida
  };

  const hideAlert = () => {
    setAlertVisible(false); // Função para ocultar o CustomAlert
  };

  const confirmAcceptRequest = async () => {
    try {
      // Lógica para aceitar a corrida (implemente conforme necessário)
      // Exemplo: const response = await Axios.post('/aceitar-corrida', { corridaId: selectedRequest.id });
      hideAlert(); // Oculta o CustomAlert após ação
      Alert.alert('Sucesso', 'Corrida aceita com sucesso!');
    } catch (error) {
      console.error('Erro ao aceitar corrida:', error);
      Alert.alert('Erro', 'Não foi possível aceitar a corrida. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={currentLocation}
        showsUserLocation={true}
        loadingEnabled={true}
        ref={mapEl}
      >
        {/* Exibir rota no mapa se destino estiver definido */}
        {destination && (
          <MapViewDirections
            origin={currentLocation}
            destination={destination}
            apikey={config.googleAPi}
            strokeWidth={3}
            strokeColor="hotpink"
            onReady={(result) => {
              mapEl.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  top: 100,
                  right: 100,
                  bottom: 100,
                  left: 100
                }
              });
            }}
          />
        )}

        {/* Marcador para a localização de destino */}
        {destination && (
          <Marker
            coordinate={destination}
            title="Local de Destino"
          />
        )}
      </MapView>
      <View style={styles.slideBar}>
        <Text style={styles.slideBarTitle}>Solicitações</Text>
        <FlatList
          data={rideRequests}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.requestContainer}
              onPress={() => handleRequestPress(item)}
            >
              <Text style={styles.requestText}>Usuário: {item.nome}</Text>
              <Text style={styles.requestText}>Origem: {item.latitudeUserOrigem || 'Origem não disponível'}</Text>
              <Text style={styles.requestText}>Destino: {item.endereco || 'Destino não disponível'}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        />
      </View>
      {/* CustomAlert para confirmar aceitação da corrida */}
      <CustomAlert
        isVisible={isAlertVisible}
        onClose={hideAlert}
        onConfirm={confirmAcceptRequest}
        message={`Realmente deseja aceitar a corrida para o usuário: ${selectedRequest ? selectedRequest.nome : ''}?`}
      />
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
    flex: 1,
  },
  slideBar: {
    height: height * 0.4,
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
    color: '#fff',
  },
  requestContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  requestText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default SolicitarCaronas;
