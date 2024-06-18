import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Alert } from "react-native";
import MapView from "react-native-maps";
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config/index.json';
import MapViewDirections from 'react-native-maps-directions';
import CustomAlert from "../Comps/CustomAlert";
import Axios from '../Comps/Axios';

const BuscarCaronasNovas = () => {
  const [isAlertVisible, setAlertVisible] = useState(false);
  const mapEl = useRef(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [userId, setUserId] = useState(null); // Novo estado para armazenar o ID do usuário

  useEffect(() => {
    // Função para obter a localização e o ID do usuário
    const initialize = async () => {
      try {
        // Solicita permissão para acessar a localização
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          throw new Error('Permissão para localização negada!');
        }

        // Obtém a localização atual
        const location = await Location.getCurrentPositionAsync({ enabledHighAccuracy: true });
        setOrigin({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        })
        ;

        // Obtém os dados do usuário armazenados no AsyncStorage
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          setUserId(user.id); // Assume que o objeto user possui uma propriedade id
        }
      } catch (error) {
        console.error('Erro ao inicializar:', error);
        Alert.alert('Erro', error.message);
      }
    };

    initialize();
  }, []);

  const hideAlert = () => {
    setAlertVisible(false);
  };

  const confirmarDestino = async () => {
    if (origin && destination) {
      const corrida = {
        "IdUserCorrida": userId,
        "latitudeUserOrigem": origin.latitude.toString(),
        "longitudeUserOrigem": origin.longitude.toString(),
        "latitudeUserDestino": destination.latitude.toString(),
        "longitudeUserDestino": destination.longitude.toString(),
        "enderco": destination.enderco.toString(),
        "hr_saida": '00:00',
        "hr_chegada": '00:00',
      };
      console.log("Corrida:");
      console.log(corrida);

      try {
        const response = await Axios.post("/corrida", corrida);

        Alert.alert("Sucesso", "Carona criada com sucesso!");
        hideAlert()
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          Alert.alert("Erro", error.response.data.message);
        } else {
          Alert.alert("Erro", "Algo deu errado. Tente novamente.");
          console.log(error)
        }
      }
    } else {
      Alert.alert("Erro", "Preencha todos os dados!");
    }
  };

  const confirmDestination = () => {
    setAlertVisible(true);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={origin}
        showsUserLocation={true}
        loadingEnabled={true}
        ref={mapEl}
      >
        {destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={config.googleAPi}
            strokeWidth={3}
            onReady={result => {
              mapEl.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  top: 50,
                  bottom: 50,
                  left: 50,
                  right: 50
                }
              });
            }}
          />
        )}
      </MapView>
      <View style={styles.search}>
        <GooglePlacesAutocomplete
          placeholder="Para onde vamos?"
          onPress={(data, details = null) => {
            setDestination({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
              enderco: details.formatted_address
            });
            confirmDestination();
          }}
          query={{
            key: config.googleAPi,
            language: 'pt-br',
          }}
          fetchDetails={true}
          styles={{ listView: { height: 100 } }}
        />
      </View>
      {isAlertVisible && (
        <CustomAlert
          isVisible={isAlertVisible}
          onClose={hideAlert}
          onConfirm={confirmarDestino}
          message="O trajeto informado está correto?"
        />
      )}
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
    height: '60%',
    backgroundColor: '#203864'
  },
  search: {
    height: '40%',
    backgroundColor: '#203864'
  }
});

export default BuscarCaronasNovas;
