import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BackGround } from '../Comps/BackGround';
import { CustomTextInputBorda } from '../Comps/CustomInputBorda';
import { CustomButton } from '../Comps/CustomButton';
import Axios from '../Comps/Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CarIcon = require("../icons/CarIcon.png");
const BrandIcon = require("../icons/BrandIcon.png");
const YearIcon = require("../icons/YearIcon.png");
const CarColorIcon = require("../icons/CarColorIcon.png");
const CrlvIcon = require("../icons/CrlvIcon.png");
const DocumentIcon = require("../icons/DocumentIcon.png");

const DadosVeiculo = () => {
    const [carro, setCarro] = useState("");
    const [marca, setMarca] = useState("");
    const [ano, setAno] = useState("");
    const [cor, setCor] = useState("");
    const [crlv, setCrlv] = useState("");
    const [documento, setDocumento] = useState("");

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const navigation = useNavigation();

    const cadastrarVeiculo = () => {
      if(carro !== "" && marca !== "" && ano !== "" && cor !== "" && crlv !== "" && documento !== ""){
        const veiculo = {
          "carro": carro,
          "marca": marca,
          "ano": ano,
          "cor": cor,
          "crlv": crlv,
          "documento": documento,
        };

        const request = Axios.post("/veiculo", veiculo);

        request.then((response) => {
          alert("Veículo cadastrado com sucesso!");
          navigation.goBack();
        }).catch((error) => {
          console.log(error);
          alert("Erro ao cadastrar veículo!");
        });
  
        setCarro("");
        setMarca("");
        setAno("");
        setCor("");
        setCrlv("");
        setDocumento("");
      } else {
        alert("Preencha todos os dados!");
      }
    };
  

    return (
        <BackGround>
          <View style={styles.formContainer}>
            <Image source={CarIcon} style={styles.avatar} />
            <CustomTextInputBorda
              placeholder="CARRO" 
              fontSize={22} 
              iconSource={CarIcon}
              onChangeText={setCarro} 
              value={carro} 
            />
            <CustomTextInputBorda
              placeholder="MARCA" 
              value={marca} 
              fontSize={22} 
              onChangeText={setMarca} 
              iconSource={BrandIcon} 
            />
            <CustomTextInputBorda
              placeholder="ANO" 
              value={ano} 
              fontSize={22} 
              onChangeText={setAno} 
              iconSource={YearIcon} 
            />
            <CustomTextInputBorda
              placeholder="COR" 
              value={cor} 
              fontSize={22} 
              onChangeText={setCor} 
              iconSource={CarColorIcon} 
            />
            <CustomTextInputBorda
              placeholder="CRLV" 
              value={crlv} 
              fontSize={22} 
              onChangeText={setCrlv} 
              secureTextEntry 
              iconSource={CrlvIcon} 
            />
            <CustomTextInputBorda
              placeholder="HABILITACAO" 
              value={documento} 
              fontSize={22} 
              onChangeText={setDocumento} 
              secureTextEntry 
              iconSource={DocumentIcon} 
            />
            <View style={styles.buttonContainer}>
              <CustomButton 
                fontSize={20} 
                title={"Cadastrar"} 
                backgroundColor="#E57A4B" 
                textColor="#FFFFFF" 
                onPress={cadastrarVeiculo} 
              />
            </View>
          </View>
        </BackGround>
      );
}
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


export default DadosVeiculo;