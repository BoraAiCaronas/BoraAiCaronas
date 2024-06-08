import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CustomButton } from '../Comps/CustomButton';
import { CustomTextInput } from '../Comps/CustomInput';
import { BackGround } from '../Comps/BackGround';
import { Logo } from '../Comps/Logo'; // Importando o componente LogoImage
import Axios from '../Comps/Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EmailIcon = require("../icons/UserIcon.png");
const PasswordIcon = require("../icons/PasswordIcon.png");
const AvatarIcon = require("../icons/IconAvatar.png");

const LoginNova = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    console.log(email);
    console.log(senha);
    try {
      const response = await Axios.post('/user/login', {
        email,
        senha,
      });
      if (response.data.error) {
        alert(response.data.error);
      } else {
        const { user } = response.data;
        if (user.flagMotorista !== 'T') {
          alert("Você não tem permissão para acessar.");
          return; // Permanece na tela de login se não for motorista
        }
        await AsyncStorage.setItem('user', JSON.stringify(user));
        alert("Login bem sucedido!")
        navigation.navigate('BuscarCaronasNovas');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BackGround>
      <View style={styles.container}>
        <Logo source={require("../icons/Logo.png")} width={413} height={360} marginBottom={20} />
        <CustomTextInput 
          placeholder='EMAIL' 
          textColor='#BCB6B6' 
          fontSize={20} 
          iconSource={EmailIcon} 
          onChangeText={setEmail} 
          value={email}  
        />
        <CustomTextInput 
          placeholder='SENHA' 
          textColor='#BCB6B6' 
          fontSize={20} 
          iconSource={PasswordIcon} 
          onChangeText={setSenha} 
          value={senha} 
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <CustomButton fontSize={20} title="Entrar" backgroundColor="#E57A4B" textColor="#FFFFFF" onPress={handleLogin} />
          <TouchableOpacity onPress={() => navigation.navigate('Registrar')}>
            <Text style={styles.registerText}>REGISTRAR-SE</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.footer}>Todos os direitos reservados</Text>
      </View>
    </BackGround>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 50,
    width: 330,
    height: 71,
  },
  registerText: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'center',
    color: '#E57A4B'
  },
  footer: {
    color: "white",
    position: "absolute",
    bottom: 0,
    marginBottom: 10,
    fontSize: 12,
    fontWeight: "bold"
  },
});

export default LoginNova;
