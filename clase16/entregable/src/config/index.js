export default {
  sqlite3: {
    client: 'sqlite3',
    connection: {
      filename: `./DB/ecommerce.sqlite`,
    },
    useNullAsDefault: true,
  },
  mariaDb: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'AHV90ry4090420202090??',
      database: 'coderhouse',
    },
  },
};
