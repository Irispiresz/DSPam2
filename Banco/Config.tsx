import * as SQLite from 'expo-sqlite';

// ABRIR BANCO
async function Banco() {

  try {

    const db = await SQLite.openDatabaseAsync(
      'STREAMIX.db'
    );

    console.log('Banco aberto');

    return db;

  } catch (error) {

    console.log(error);
  }
}

// CRIAR TABELA
async function createTable(
  db: SQLite.SQLiteDatabase
) {

  try {

    await db.execAsync(`

      PRAGMA journal_mode = WAL;

      CREATE TABLE IF NOT EXISTS SERIE (

        ID_SERIE INTEGER PRIMARY KEY AUTOINCREMENT,

        NOME_SERIE TEXT,

        GENERO_SERIE TEXT

      );

    `);

    console.log('Tabela criada');

  } catch (error) {

    console.log(
      'Erro ao criar tabela',
      error
    );
  }
}

// INSERIR
async function insertSerie(

  db: SQLite.SQLiteDatabase,

  nome: string,

  genero: string

) {

  try {

    await db.runAsync(

      `
        INSERT INTO SERIE
        (NOME_SERIE, GENERO_SERIE)

        VALUES (?, ?)
      `,

      nome,

      genero

    );

    console.log('Série adicionada');

  } catch (error) {

    console.log(
      'Erro ao inserir série',
      error
    );
  }
}

// LISTAR
async function selectSeries(
  db: SQLite.SQLiteDatabase
) {

  try {

    const result = await db.getAllAsync(

      `
        SELECT *
        FROM SERIE

        ORDER BY ID_SERIE DESC
      `
    );

    return result;

  } catch (error) {

    console.log(
      'Erro ao buscar séries',
      error
    );
  }
}

// EXCLUIR
async function deleteSerie(

  db: SQLite.SQLiteDatabase,

  id: number

) {

  try {

    await db.runAsync(

      `
        DELETE FROM SERIE
        WHERE ID_SERIE = ?
      `,

      id
    );

    console.log('Série removida');

  } catch (error) {

    console.log(
      'Erro ao remover série',
      error
    );
  }
}

// ATUALIZAR
async function updateSerie(

  db: SQLite.SQLiteDatabase,

  id: number,

  nome: string,

  genero: string

) {

  try {

    await db.runAsync(

      `
        UPDATE SERIE

        SET
          NOME_SERIE = ?,
          GENERO_SERIE = ?

        WHERE ID_SERIE = ?
      `,

      nome,
      genero,
      id

    );

    console.log('Série atualizada');

  } catch (error) {

    console.log(
      'Erro ao atualizar série',
      error
    );
  }
}

// EXPORTAR
export {

  Banco,

  createTable,

  insertSerie,

  selectSeries,

  deleteSerie,

  updateSerie

};