import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import {
  Banco, createTable, insertUsuario, selectUsuarios, deleteUsuario
} from './Banco/Config';

import { useEffect, useState } from 'react';

export default function App() {

  const [db, setDb] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function init() {
      const database = await Banco();
      setDb(database);
      await createTable(database);
      carregarUsuarios(database);
    }
    init();
  }, []);

  async function carregarUsuarios(database = db) {
    const lista = await selectUsuarios(database);
    setUsuarios(lista);
  }

  async function adicionar() {
    if (!nome || !email) return;

    await insertUsuario(db, nome, email);
    setNome('');
    setEmail('');
    carregarUsuarios();
  }

  async function remover(id) {
    await deleteUsuario(db, id);
    carregarUsuarios();
  }

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>CRUD de Usuários</Text>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <Button title="Adicionar" onPress={adicionar} />

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.ID_US.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.NOME_US} - {item.EMAIL_US}</Text>
            <Button title="Excluir" onPress={() => remover(item.id)} />
          </View>
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40
  },
  titulo: {
    fontSize: 22,
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 8
  },
  item: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1
  }
});