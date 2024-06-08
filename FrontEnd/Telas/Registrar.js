import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BackGround } from '../Comps/BackGround';
import { CustomTextInputBorda } from '../Comps/CustomInputBorda';
import { CustomButton } from '../Comps/CustomButton';
import Axios from '../Comps/Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EmailIcon = require("../icons/EmailIcon.png");
const PasswordIcon = require("../icons/PasswordIcon.png");
const UserIcon = require("../icons/UserIcon.png");
const CPFIcon = require("../icons/CPFIcon.png");
const Phone = require("../icons/Phone.png");
const AvatarIcon = require("../icons/IconAvatar.png");

const CadastroScreen = () => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserData(userId);
    }
  }, [userId]);

  const checkLoginStatus = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setIsLoggedIn(true);
        const userData = JSON.parse(user);
        setUserId(userData.id);
        console.log("usuario: " + user + "id: " + userData.id)
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserData = async (id) => {
    try {
      const response = await Axios.get(`/user/${id}`);
      const userData = response.data;
      setNome(userData.nome);
      setCpf(userData.CPF);
      setEmail(userData.email);
      setTelefone(userData.telefone);
      setSenha(userData.senha);
      setConfirmarSenha(userData.senha);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao buscar dados do usuário.');
    }
  };

  const handleCadastro = () => {
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }
    if(nome !== "" && email !== "" && telefone !== "" && senha !== "" && confirmarSenha !== "" && cpf !== ""){
      const usuario = {
        "nome": nome,
        "CPF": cpf,
        "telefone": telefone,
        "email": email,
        "senha": senha,
        "confirmarSenha": confirmarSenha,
      };

      const request = isLoggedIn ? Axios.put(`/user/${userId}`, usuario) : Axios.post("/user/cadastro", usuario);

      request.then((response) => {
        alert(isLoggedIn ? "Usuário atualizado com sucesso!" : "Usuário cadastrado com sucesso!");
        if (!isLoggedIn) {
          setIsLoggedIn(true);
        }
        navigation.goBack();
      }).catch((error) => {
        console.log(error);
        alert(isLoggedIn ? "Erro ao atualizar usuário!" : "Erro ao cadastrar usuário!");
      });

      setNome("");
      setCpf("");
      setTelefone("");
      setEmail("");
      setSenha("");
      setConfirmarSenha("");
    } else {
      alert("Preencha todos os dados!");
    }
  };

  return (
    <BackGround>
      <View style={styles.formContainer}>
        <Image source={AvatarIcon} style={styles.avatar} />
        <CustomTextInputBorda
          placeholder="NOME" 
          fontSize={22} 
          iconSource={UserIcon}
          onChangeText={setNome} 
          value={nome} 
        />
        <CustomTextInputBorda
          placeholder="CPF" 
          value={cpf} 
          fontSize={22} 
          onChangeText={setCpf} 
          iconSource={CPFIcon} 
        />
        <CustomTextInputBorda
          placeholder="FONE" 
          value={telefone} 
          fontSize={22} 
          onChangeText={setTelefone} 
          iconSource={Phone} 
        />
        <CustomTextInputBorda
          placeholder="EMAIL" 
          value={email} 
          fontSize={22} 
          onChangeText={setEmail} 
          iconSource={EmailIcon} 
        />
        <CustomTextInputBorda
          placeholder="SENHA" 
          value={senha} 
          fontSize={22} 
          onChangeText={setSenha} 
          secureTextEntry 
          iconSource={PasswordIcon} 
        />
        <CustomTextInputBorda
          placeholder="CONFIRME SENHA" 
          value={confirmarSenha} 
          fontSize={22} 
          onChangeText={setConfirmarSenha} 
          secureTextEntry 
          iconSource={PasswordIcon} 
        />
        <View style={styles.buttonContainer}>
          <CustomButton 
            fontSize={20} 
            title={isLoggedIn ? "Editar" : "Cadastrar"} 
            backgroundColor="#E57A4B" 
            textColor="#FFFFFF" 
            onPress={handleCadastro} 
          />
        </View>
      </View>
    </BackGround>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 50, // Ajuste esta margem para mover os campos mais para baixo
    alignItems: 'center', // Centralizar o avatar
  },
  avatar: {
    width: 110, // Largura do avatar
    height: 100, // Altura do avatar
    marginBottom: 20, // Espaçamento abaixo do avatar
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 50,
    width: 330,
    height: 71,
  },
});

export default CadastroScreen;