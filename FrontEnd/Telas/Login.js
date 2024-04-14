import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Axios from '../Comps/Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const logo = require("../icons/Veiculo.png");

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {

    if (isNotValidData(email, senha)){

      return
    }

    try {

      const response = await Axios.post('/user/login', {
        email: email,
        senha: senha
      });

      if (response.data.error) {

        alert(response.data.error);

      } else {

        const { user } = response.data;
        await AsyncStorage.setItem('user', JSON.stringify(user));
        alert("Login bem sucedido!")
        navigation.navigate('HomeCarona');
      }

    } catch (error) {

      console.error(error);
    }
  };  

  const isNotValidData = (email, senha) => {

    if (isEmailNotValid(email)){

      alert("O Email informado não é válido!");
      return true
    }

    if (isSenhaNotValid(senha)){

      alert("Senha deve ser informada!");
      return true
    }

    return false
  }

  const isSenhaNotValid = (senha) => typeof senha === "string" && senha.length === 0 || senha === null

  const isEmailNotValid = (email) => {
   
    const emailPattern = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/
    return !emailPattern.test(email)
  };
  
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGAR</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Cadastrar')}>
        <Text style={styles.footerText}>Não possui cadastro? Faça o cadastro</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  logo: {
    width: 164,
    height: 189,
  },
  input: {
    width: '100%',
    height: 55,
    borderRadius: 20,
    backgroundColor: '#f2f2f2',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: '100%',
    height: 55,
    borderRadius: 20,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default LoginScreen;
