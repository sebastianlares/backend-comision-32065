export default class ContenedorFirebase {
  constructor(collection, config = {}, admin = {}) {
    this.config = config;
    this.admin = admin;
    this.connect();
    this.db = admin.firestore();
    this.collection = this.db.collection(`${collection}`);
  }

  async save(item) {
    item.timestamp = Date.now();
    try {
      await this.collection.add(item);
      const docs = await this.getAll();
      return docs;
    } catch (error) {
      return error;
    }
  }

  async connect() {
    if (this.config?.firebase) {
      try {
        this.admin.initializeApp({
          credential: this.admin.credential.cert(this.config.firebase),
        });
      } catch (error) {
        throw error;
      }
    }
  }

  async updateById(newItem, id) {
    try {
      newItem.timestamp = Date.now();
      const doc = this.collection.doc(`${id}`);
      await doc.update(newItem);
      return await this.getAll();
    } catch (error) {
      return error;
    }
  }

  async getById(id) {
    try {
      const doc = this.collection.doc(`${id}`);
      const item = await doc.get();
      return item.data();
    } catch (error) {
      return error;
    }
  }

  async getAll() {
    try {
      const items = await this.collection.get();
      const allDocs = items.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return allDocs;
    } catch (error) {
      return error;
    }
  }

  async deleteById(id) {
    try {
      const doc = this.collection.doc(`${id}`);
      await doc.delete();
      return await this.getAll();
    } catch (error) {}
  }
}
