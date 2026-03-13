import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ActivityIndicator, TextInput, Alert } from 'react-native';

export default function App() {
  const [cep, setCep] = useState({});
  const [loading, setLoading] = useState(false);
  const [inputCep, setInputCep] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const BuscaCep = async (argCep) => {
    setErrorMessage('');

    if (!argCep) {
      const msg = 'Digite um CEP.';
      setErrorMessage(msg);
      Alert.alert('CEP inválido', msg);
      return;
    }

    const clean = String(argCep).replace(/\D/g, '');
    if (clean.length !== 8) {
      const msg = 'Digite um CEP com 8 números.';
      setErrorMessage(msg);
      Alert.alert('CEP inválido', msg);
      return;
    }

    setLoading(true);
    setCep({});
    try {
      const url = `https://viacep.com.br/ws/${clean}/json/`;
      const resp = await fetch(url);
      const data = await resp.json();

      if (data.erro) {
        const msg = 'CEP não encontrado.';
        setErrorMessage(msg);
        Alert.alert('CEP não encontrado', 'Digite um CEP válido.');
        setCep({});
      } else {
        setCep(data);
        setErrorMessage('');
      }
    } catch (error) {
      const msg = 'Não foi possível buscar o CEP. Verifique a conexão.';
      setErrorMessage(msg);
      Alert.alert('Erro', msg);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
  
    <Text style={{ fontSize: 25, marginBottom: 10,fontWeight: 'bold' }}>Digite seu cep abaixo:</Text>

      <TextInput
        placeholder="Digite o CEP"
        value={inputCep}
        onChangeText={setInputCep}
        maxLength={8}
        style={{ borderColor: 'gray', borderWidth: 1, height: 40,
           width: 200, marginBottom: 10, paddingHorizontal: 8 }}
        keyboardType="numeric"
      />

      {errorMessage ? (
        <Text style={{ color: 'red', marginBottom: 8 }}>{errorMessage}</Text>
      ) : null}

      <Button
      color={'purple'}
        title="Buscar CEP"
        onPress={() => BuscaCep(inputCep)}
      />

      {loading && <ActivityIndicator size="large" color="purple" />}

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
