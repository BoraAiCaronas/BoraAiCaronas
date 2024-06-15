import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import BuscarCaronasNovas from "../Telas/BuscarCaronasNovas";
import Historico from "../Telas/Historico";
import AceitarCaronas from "../Telas/AceitarCaronas";
import { View, StyleSheet, Alert, Image } from 'react-native';
import CadastroScreen from "../Telas/Registrar";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AvatarIcon = require("../icons/IconAvatar.png");
const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
  avatar: {
    width: 60, 
    height: 55, 
    marginBottom: 0,
  },
  logoContainer: {
    flex: 1, 
    justifyContent: 'flex-end', 
    alignItems: 'center', 
    marginBottom: 20,
  },
});

function CustomDrawerContent(props) {
  const navigation = props.navigation;

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.replace('LoginNova'); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Sair"
        onPress={handleLogout}
        labelStyle={{ color: '#FFFFFF', fontSize: 19 }}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStatusBarAnimation: 'slide',
        drawerStyle: {
          backgroundColor: '#203864',
          width: 250,
        },
        drawerLabelStyle: {
          color: '#FFFF',
          fontSize: 19,
        },
        drawerActiveBackgroundColor: '#E57A4B',
        headerStyle: {
          backgroundColor: '#203864', // Cor de fundo do cabeçalho
        },
        headerTintColor: '#E57A4B',
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Usuário"
        component={CadastroScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Image source={AvatarIcon} style={[styles.avatar, { tintColor: color }]} />
          ),
        }}
      />
      <Drawer.Screen
        name="Buscar Carona"
        component={BuscarCaronasNovas}
      />
      <Drawer.Screen
        name="Histórico"
        component={Historico}
      />
      {/*  
      <Drawer.Screen
        name="Dados do Veículo"
        component={BuscarCaronasNovas}
      /> */}
    </Drawer.Navigator>
  );
}
