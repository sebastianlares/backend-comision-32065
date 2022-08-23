const fs = require('fs');
const getFormatedDate = require('../src/helpers');

class FileContainer {
    constructor(fileRoute) {
        this.fileRoute = fileRoute;
    }
    async save(message) {
        const messages = await this.getAllMessages();
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
