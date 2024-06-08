import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import Historico from "../Telas/Historico";
import AceitarCaronas from "../Telas/AceitarCaronas"
import { View, StyleSheet, Alert, Image } from 'react-native';
import CadastroScreen from "../Telas/Registrar";
import { Logo } from '../Comps/Logo'; // Importando o componente LogoImage
import DadosVeiculo from "../Telas/DadosVeiculo"
import SolicitacoesCaronas from "../Telas/SolicitacoesCaronas"


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
})


export default function DrawerRoutes(){
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
          fontSize: 19
        },
        drawerActiveBackgroundColor: '#E57A4B', 
        headerStyle: {
          backgroundColor: '#203864', // Cor de fundo do cabeçalho
        },
        headerTintColor: '#E57A4B',
      }}
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
        name="Dados Veículo"
        component={DadosVeiculo}
      /> 
      <Drawer.Screen
        name="Aceitar Caronas"
        component={SolicitacoesCaronas}
      /> 
      <Drawer.Screen
        name="Histórico"
        component={Historico}
      /> 
      {/*  
      <Drawer.Screen
        name="Dados do Veículo"
        component={BuscarCaronasNovas}
      /> 
    <Drawer.Screen
        name="Sair"
        component={Navegator}
        options={{ headerShown: false }} 
      />*/}   
      </Drawer.Navigator>
    
  );
  
}
