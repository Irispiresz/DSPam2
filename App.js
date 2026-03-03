import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
// criar um estado para armazenar o valor do cep
  const [cep, setCep] = useState([]);

  const Cep = (x) => {
    let url = `https://viacep.com.br/ws/${x}/json/`;
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
        console.log(data);
        setCep(data);
        console.log(cep.logradouro);
    }).catch((error) => {
        console.error('Error:', error);
    });

  }


  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button  
        title="Buscar CEP"
        onPress={() => Cep('18185033')} />
      <StatusBar style="auto" />
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
