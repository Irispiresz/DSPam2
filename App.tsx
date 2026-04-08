import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Banco } from './Banco/Conf';
import { useEffect } from 'react';


export default function App() {
  
  useEffect(() => {
    async function Main() {
      const db = await Banco();
      // Aqui você pode usar o objeto `db` para interagir com o banco de dados
    };
    Main();
  }, []);



  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
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
