import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ActivityIndicator, TextInput, Alert } from 'react-native';

export default function App() {
  const [cep, setCep] = useState({});
  const [loading, setLoading] = useState(false);
  const [inputCep, setInputCep] = useState('');

  const BuscaCep = async (argCep) => {
    setLoading(true);
    try {
      const url = `https://viacep.com.br/ws/${argCep}/json/`;
      const resp = await fetch(url);
      const data = await resp.json();

      if (data.erro) {
        Alert.alert("CEP não encontrado", "Digite um CEP válido.");
        setCep({});
      } else {
        setCep(data);
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível buscar o CEP.");
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Digite o CEP"
        value={inputCep}
        onChangeText={setInputCep}
        style={{ borderColor: 'gray', borderWidth: 1, height: 40, width: 200, marginBottom: 10, paddingHorizontal: 8 }}
        keyboardType="numeric"
      />

      <Button
        title="Buscar CEP"
        onPress={() => BuscaCep(inputCep)}
      />

      {loading && <ActivityIndicator size="large" color="blue" />}

      {cep.cep && (
        <View style={{ marginTop: 20 }}>
          <Text>CEP: {cep.cep}</Text>
          <Text>Endereço: {cep.logradouro}</Text>
          <Text>Bairro: {cep.bairro}</Text>
          <Text>Cidade: {cep.localidade}</Text>
          <Text>Estado: {cep.uf}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
