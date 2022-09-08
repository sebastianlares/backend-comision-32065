import knex from 'knex';

class Database {
  constructor(configOptions, table) {
    this.DBconnection = knex(configOptions);
    this.table = table;
  }

  async insert(data) {
    try {
      await this.DBconnection(this.table).insert(data);
    } catch (error) {
      console.error(error);
    }
  }

  async selectById(id) {
    try {
      const selectedRow = await this.DBconnection(this.table).select('*').where('id', '=', id);
      return selectedRow;
    } catch (error) {
      console.error(error);
    }
  }

  async getData() {
    try {
      let data = await this.DBconnection(this.table).select('*');
      data = JSON.parse(JSON.stringify(data));
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteById(id) {
    try {
      await this.DBconnection(this.table).where('id', '=', id).del();
    } catch (error) {
      console.error(error);
    }
  }
}

export default Database;
