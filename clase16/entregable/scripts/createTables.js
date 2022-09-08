import knex from 'knex';
import config from '../src/config/index.js';

//------------------------------------------
// productos en MariaDb
(async () => {
  const mariaDbClient = knex(config.mariaDb);
  const sqliteClient = knex(config.sqlite3);

  try {
    await mariaDbClient.schema.dropTableIfExists('products');
    //Implementar creación de tabla
    await mariaDbClient.schema.createTable('products', table => {
      table.increments('id').primary();
      table.string('nombre').notNullable();
      table.float('precio').notNullable();
      table.string('foto').notNullable();
    });
    console.log('tabla creada con éxito');
  } catch (error) {
    console.log(error);
  } finally {
    mariaDbClient.destroy();
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
