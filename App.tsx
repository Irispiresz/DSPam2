
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
  insertSerie,
  selectSeries,
  deleteSerie,
  updateSerie
} from './Banco/Config';

export default function App() {

  const [db, setDb] = useState<any>(null);

  const [nome, setNome] = useState('');
  const [genero, setGenero] = useState('');

  const [series, setSeries] = useState<any[]>([]);

  const [editando, setEditando] = useState(false);

  const [idEditando, setIdEditando] =
    useState<number | null>(null);

  useEffect(() => {

    async function iniciarBanco() {

      const database = await Banco();

      if (database) {

        setDb(database);

        await createTable(database);

        carregarSeries(database);
      }
    }

    iniciarBanco();

  }, []);

  async function carregarSeries(database = db) {

    const dados = await selectSeries(database);

    if (dados) {
      setSeries(dados as any[]);
    }
  }

  async function salvar() {

    if (!nome || !genero) return;

    if (editando && idEditando !== null) {

      await updateSerie(
        db,
        idEditando,
        nome,
        genero
      );

      setEditando(false);
      setIdEditando(null);

    } else {

      await insertSerie(
        db,
        nome,
        genero
      );
    }

    setNome('');
    setGenero('');

    carregarSeries();
  }

  function editar(item: any) {

    setNome(item.NOME_SERIE);

    setGenero(item.GENERO_SERIE);

    setIdEditando(item.ID_SERIE);

    setEditando(true);
  }

  async function remover(id: number) {

    await deleteSerie(db, id);

    carregarSeries();
  }

  return (

    <View style={styles.container}>

      <StatusBar style="light" />

      <View style={styles.header}>

        <Text style={styles.logo}>
          Crud Séries
        </Text>

        <Text style={styles.subtitle}>
          catálogo de séries
        </Text>

        <Text style={styles.counter}>
          {series.length} séries adicionadas
        </Text>

      </View>

      <View style={styles.form}>

        <TextInput
          placeholder="Nome da série"
          placeholderTextColor="#94a3b8"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
        />

        <TextInput
          placeholder="Gênero"
          placeholderTextColor="#94a3b8"
          value={genero}
          onChangeText={setGenero}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={salvar}
        >

          <Text style={styles.buttonText}>

            {editando
              ? 'Salvar'
              : 'Adicionar Série'}

          </Text>

        </TouchableOpacity>

      </View>

      <FlatList
  data={series}

  numColumns={2}

  columnWrapperStyle={{
    justifyContent: 'space-between',
  }}

  showsVerticalScrollIndicator={false}

  contentContainerStyle={{
    paddingBottom: 30
  }}

  keyExtractor={(item) =>
    item.ID_SERIE.toString()
  }

  renderItem={({ item }) => (

    <View style={styles.verticalCard}>

      <View style={styles.posterVertical}>

        <Text style={styles.posterEmoji}>
          🎬
        </Text>

      </View>

      <Text
        numberOfLines={1}
        style={styles.verticalTitle}
      >
        {item.NOME_SERIE}
      </Text>

      <Text
        numberOfLines={1}
        style={styles.verticalGenre}
      >
        {item.GENERO_SERIE}
      </Text>

      <View style={styles.verticalActions}>

        <TouchableOpacity
          onPress={() => editar(item)}
          style={styles.editBtn}
        >

          <Text style={styles.icon}>
            ✎
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            remover(item.ID_SERIE)
          }
          style={styles.deleteBtn}
        >

          <Text style={styles.icon}>
            ×
          </Text>

        </TouchableOpacity>

      </View>

    </View>

  )}
/>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#020617',
    paddingTop: 70,
    paddingHorizontal: 22,
    fontFamily: 'Callibri',
  },

  header: {
    marginBottom: 35,
  },

  logo: {
    color: '#ffffff',
    fontSize: 48,
    fontWeight: '800',
    letterSpacing: 3,
   
  },

  subtitle: {
    color: '#94a3b8',
    marginTop: 4,
    fontSize: 13,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },

  counter: {
    color: '#64748b',
    marginTop: 10,
    fontSize: 13,
  },

  form: {
    marginBottom: 30,
  },

  input: {
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#1e293b',
    borderRadius: 18,
    padding: 16,
    color: '#fff',
    marginBottom: 14,
    fontSize: 15,
  },

  button: {
    backgroundColor: '#7c3aed',
    padding: 17,
    borderRadius: 18,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },

  card: {
    backgroundColor: '#0f172a',
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1e293b',
  },

  poster: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: '#7c3aed',
    alignItems: 'center',
    justifyContent: 'center',
  },

  posterText: {
    fontSize: 24,
  },

  info: {
    flex: 1,
    marginLeft: 16,
  },

  name: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },

  genre: {
    color: '#94a3b8',
    marginTop: 5,
    fontSize: 13,
  },

  actions: {
    flexDirection: 'row',
  },

  editBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

  deleteBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  verticalCard: {
  width: '48%',

  backgroundColor: '#0f172a',

  borderRadius: 22,

  padding: 12,

  marginBottom: 16,

  borderWidth: 1,

  borderColor: '#1e293b',
},

posterVertical: {
  width: '100%',

  height: 140,

  borderRadius: 16,

  backgroundColor: '#7c3aed',

  alignItems: 'center',

  justifyContent: 'center',

  marginBottom: 12,
},

posterEmoji: {
  fontSize: 45,
},

verticalTitle: {
  color: '#fff',

  fontSize: 15,

  fontWeight: '700',
},

verticalGenre: {
  color: '#94a3b8',

  marginTop: 4,

  fontSize: 12,
},

verticalActions: {
  flexDirection: 'row',

  justifyContent: 'space-between',

  marginTop: 14,
},

});

