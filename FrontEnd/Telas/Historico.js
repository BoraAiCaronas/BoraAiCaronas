import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { BackGround } from '../Comps/BackGround';
import DropDownPicker from 'react-native-dropdown-picker';
import Axios from '../Comps/Axios'; // Importe Axios com suas configurações
import AsyncStorage from '@react-native-async-storage/async-storage';

const Historico = () => {
  const [anoSelecionado, setAnoSelecionado] = useState(null);
  const [mesSelecionado, setMesSelecionado] = useState(null);
  const [userId, setUserId] = useState(null); // Estado para armazenar o ID do usuário logado
  const [historico, setHistorico] = useState([]); // Estado para armazenar o histórico de corridas

  useEffect(() => {
    fetchUserId(); // Ao montar o componente, busca o ID do usuário logado
  }, []);

  useEffect(() => {
    if (userId) {
      fetchHistorico(); // Quando o userId estiver disponível, busca o histórico de corridas do passageiro
    }
  }, [userId]);

  const fetchUserId = async () => {
    try {
      // Lógica para buscar o ID do usuário logado (substitua pela sua lógica específica)
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const userData = JSON.parse(user);
        setUserId(userData.id);
      }
    } catch (error) {
      console.error('Erro ao buscar ID do usuário:', error);
    }
  };

  const fetchHistorico = async () => {
    try {
      // Consulta ao endpoint para buscar histórico de corridas finalizadas pelo passageiro
      const response = await Axios.get(`/corrida/finalizadas/passageiro/${userId}`);
      setHistorico(response.data); // Atualiza o estado com o histórico obtido
    } catch (error) {
      console.error('Erro ao buscar histórico de corridas:', error);
    }
  };

  // Função para agrupar histórico por data
  const groupByDay = (historico) => {
    const grouped = {};
    historico.forEach((item) => {
      const date = item.hr_saida.substring(0, 10); // Obtém apenas a parte da data (yyyy-mm-dd)
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(item);
    });
    return grouped;
  };

  // Extração de anos e meses do histórico, filtrado por ano e mês selecionados
  const anos = Array.from(new Set(historico.map(ride => ride.hr_saida.substring(0, 4))));
  const meses = Array.from(new Set(historico.map(ride => ride.hr_saida.substring(5, 7))));

  // Filtrar histórico com base no ano e mês selecionados
  const filtroHistorico = historico.filter(ride => {
    if (anoSelecionado && mesSelecionado) {
      const ano = ride.hr_saida.substring(0, 4);
      const mes = ride.hr_saida.substring(5, 7);
      return ano === anoSelecionado && mes === mesSelecionado;
    }
    return true;
  });

  // Histórico agrupado por dia
  const historicoAgrupado = groupByDay(filtroHistorico);

  // Exibição do componente
  return (
    <BackGround>
      <View style={{ flex: 1, paddingTop: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15 }}>
          <DropDownPicker
            items={anos.map(ano => ({ label: ano, value: ano }))}
            placeholder="ANO"
            containerStyle={{ height: 40, width: '45%' }}
            style={{ backgroundColor: '#E57A4B', borderColor: '#E57A4B' }}
            itemStyle={{ justifyContent: 'flex-start' }}
            dropDownStyle={{ backgroundColor: '#E57A4B' }}
            onChangeItem={item => setAnoSelecionado(item.value)}
            textStyle={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' }}
            zIndex={5000}
          />
          <DropDownPicker
            items={meses.map(mes => ({ label: mes, value: mes }))}
            placeholder="MÊS"
            containerStyle={{ height: 40, width: '45%' }}
            style={{ backgroundColor: '#E57A4B', borderColor: '#E57A4B' }}
            itemStyle={{ justifyContent: 'flex-start' }}
            dropDownStyle={{ backgroundColor: '#E57A4B' }}
            onChangeItem={item => setMesSelecionado(item.value)}
            textStyle={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' }}
            zIndex={4000}
          />
        </View>

        <View style={{ flex: 1, marginBottom: 20 }}>
          <FlatList
            style={{ backgroundColor: '#E57A4B', marginBottom: 15 }}
            contentContainerStyle={{ paddingBottom: 20 }}
            data={filtroHistorico}
            keyExtractor={item => item.IdCorrida.toString()} // Usando IdCorrida como chave única
            renderItem={({ item }) => (
              <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
                <Text style={[styles.textList]}>
                  Data: {item.hr_saida.substring(0, 10)} - Recebida - Origem: {item.latitudeUserOrigem}, {item.longitudeUserOrigem} - Destino: {item.endereco}
                </Text>
              </View>
            )}
            ListEmptyComponent={<Text style={[styles.textList, { color: '#5A5151', alignSelf: 'center' }]}>Nenhuma corrida encontrada.</Text>}
          />
        </View>
      </View>
    </BackGround>
  );
};

const styles = StyleSheet.create({
  textList: {
    color: '#5A5151',
    fontSize: 20,
    textAlign: 'center'
  },
});

export default Historico;
