import knex from 'knex';
import config from '../src/config/index.js';

//------------------------------------------
// productos en MySql
(async () => {
  const mySqlClient = knex(config.mysql);
  const sqliteClient = knex(config.sqlite3);

  try {
    await mySqlClient.schema.dropTableIfExists('products');
    //Implementar creación de tabla
    await mySqlClient.schema.createTable('products', table => {
      table.increments('id').primary();
      table.string('nombre').notNullable();
      table.float('precio').notNullable();
      table.string('foto').notNullable();
    });
    console.log('tabla creada con éxito');
  } catch (error) {
    console.log(error);
  } finally {
    mySqlClient.destroy();
  }

  //------------------------------------------
  // mensajes en SQLite3

  try {
    //Implementar creación de tabla
    await sqliteClient.schema.dropTableIfExists('messages');
    await sqliteClient.schema.createTable('messages', table => {
      table.increments('id').primary();
      table.string('userName', 15).notNullable();
      table.text('message').notNullable();
      table.text('date').notNullable();
    });

    console.log('tabla en sqlite3 creada con éxito');
  } catch (error) {
    console.log(error);
  } finally {
    sqliteClient.destroy();
  }
})();
