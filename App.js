import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';

import { useEffect, useState } from 'react';

import {
  createTable,
  insertCantor,
  selectCantores,
  deleteCantor,
  updateCantor,
} from './Banco/Conf';

export default function App() {
  const [nome, setNome] = useState('');
  const [genero, setGenero] = useState('');
  const [cantores, setCantores] = useState([]);

  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  useEffect(() => {
    createTable();
    carregar();
  }, []);

  async function carregar() {
    const data = await selectCantores();
    setCantores(data);
  }

  async function salvar() {
    if (!nome || !genero) return;

    if (editando) {
      await updateCantor(idEditando, nome, genero);
      setEditando(false);
      setIdEditando(null);
    } else {
      await insertCantor(nome, genero);
    }

    setNome('');
    setGenero('');
    carregar();
  }

  function editar(item) {
    setNome(item.NOME);
    setGenero(item.GENERO);
    setIdEditando(item.ID);
    setEditando(true);
  }

  async function remover(id) {
    await deleteCantor(id);
    carregar();
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Text style={styles.title}>🎤 Music CRUD</Text>

      <Text style={styles.subtitle}>
        Gerencie seus cantores favoritos
      </Text>

      {/* FORM */}
      <View style={styles.card}>
        <TextInput
          placeholder="Nome do cantor"
          placeholderTextColor="#aaa"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
        />

        <TextInput
          placeholder="Gênero musical"
          placeholderTextColor="#aaa"
          value={genero}
          onChangeText={setGenero}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={salvar}
        >
          <Text style={styles.buttonText}>
            {editando ? 'Salvar edição' : 'Adicionar cantor'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* LISTA */}
      <FlatList
        data={cantores}
        keyExtractor={(item) => item.ID.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.name}>🎵 {item.NOME}</Text>
              <Text style={styles.genre}>{item.GENERO}</Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => editar(item)}
              >
                <Text style={styles.btnText}>✎</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => remover(item.ID)}
              >
                <Text style={styles.btnText}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}