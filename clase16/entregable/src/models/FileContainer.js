const fs = require('fs');
const getFormatedDate = require('../helpers');

class FileContainer {
  constructor(fileRoute) {
    this.fileRoute = fileRoute;
  }
  async save(message) {
    const messages = await this.getAllMessages();
    //mover message.date al momento de guardar el objeto en main.js
    message.date = getFormatedDate();
    messages.push(message);
    try {
      await fs.promises.writeFile(this.fileRoute, JSON.stringify(messages));
    } catch (error) {
      console.error(error);
    }
  }

  async getAllMessages() {
    try {
      let messagesArray = await fs.promises.readFile(this.fileRoute, 'utf-8');
      if (!messagesArray.length) return [];
      return JSON.parse(messagesArray);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.fileRoute, '');
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = FileContainer;
