import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ActivityIndicator, TextInput} from 'react-native';

export default function App() {
// criar um estado para armazenar o valor do cep
  const [cep, setCep] = useState([]);
  const [loading, setLoading] = useState (false);

  const BuscaCep = async (argCep) => {
    setLoading(true);
    const url = `https://viacep.com.br/ws/${argCep}/json/`;
    fetch(url)
    .then(resp => resp.json())
    .then((data) => {
        console.log(data)
        setCep(data)
      })
    .catch((error) => { console.log ("?" + error) } 
    )
    setLoading(false);
    }

  return (
    <View style={styles.container}>
      
      <Button  
        title="CEP"
        onPress={() => {BuscaCep ('18162002')}} 
        />
        {loading && <ActivityIndicator size = "large" color= "blue"/>}

        {
          cep.cep != null && (
            <View>

              <TextInput 
                value = {cep.logradouro}
                style = {{borderColor : 'gray', borderWidth:1, height:40}}
                onChangeText= { text =>{ setCep({...cep, logradouro : text})}}
              />
              
              
              <Text> endereço : {cep.logradouro} </Text>
              <Text> bairro : {cep.bairro} </Text>
              <Text> cidade : {cep.localidade} </Text>
              <Text> estado : {cep.estado} </Text>
            </View>
          )
        }
      
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
