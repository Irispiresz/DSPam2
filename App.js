import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import { useEffect, useState } from 'react';

import {
  Banco,
  createTable,
  insertUsuario,
  selectUsuarios,
  deleteUsuario,
  updateUsuario
} from 'Banco/Config';

export default function App() {

  const [db, setDb] = useState(null);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const [usuarios, setUsuarios] = useState([]);

  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  useEffect(() => {

    async function iniciarBanco() {

      const database = await Banco();

      if (database) {

        setDb(database);

        await createTable(database);

        carregarUsuarios(database);
      }
    }

    iniciarBanco();

  }, []);

  async function carregarUsuarios(database = db) {

    const dados = await selectUsuarios(database);

    if (dados) {
      setUsuarios(dados);
    }
  }

  async function salvar() {

    if (!nome || !email) return;

    if (editando && idEditando !== null) {

      await updateUsuario(
        db,
        idEditando,
        nome,
        email
      );

      setEditando(false);
      setIdEditando(null);

    } else {

      await insertUsuario(
        db,
        nome,
        email
      );
    }

    setNome('');
    setEmail('');

    carregarUsuarios();
  }

  function editar(item) {

    setNome(item.NOME_US);
    setEmail(item.EMAIL_US);

    setIdEditando(item.ID_US);

    setEditando(true);
  }

  async function remover(id) {

    await deleteUsuario(db, id);

    carregarUsuarios();
  }

      <FlatList
        data={usuarios}

        keyExtractor={(item) =>
          item.ID_US.toString()
        }

        renderItem={({ item }) => (

          <View style={styles.item}>

            <View>

              <Text style={styles.name}>
                {item.NOME_US}
              </Text>

              <Text style={styles.email}>
                {item.EMAIL_US}
              </Text>

            </View>

            <View style={styles.actions}>

              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => editar(item)}
              >

                <Text style={styles.btnText}>
                  ✎
                </Text>

              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() =>
                  remover(item.ID_US)
                }
              >

                <Text style={styles.btnText}>
                  ✕
                </Text>

              </TouchableOpacity>

            </View>

          </View>

        )}
      />

    </View>
      }
    );


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },

  input: {
    backgroundColor: '#2a2a2a',
    color: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },

  button: {
    backgroundColor: '#7c3aed',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  item: {
    backgroundColor: '#1f1f1f',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  email: {
    color: '#bbb',
    marginTop: 4,
  },

  actions: {
    flexDirection: 'row',
  },

  editBtn: {
    backgroundColor: '#2563eb',
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
  },

  deleteBtn: {
    backgroundColor: '#dc2626',
    padding: 10,
    borderRadius: 8,
  },

  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },

});