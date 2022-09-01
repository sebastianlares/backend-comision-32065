const { promises: fs } = require('fs');
const getFormatedDate = require('../helpers');

class ContenedorArchivo {
    constructor(fileRoute) {
        this.fileRoute = fileRoute;
    }

    async save(item) {
        const allItems = await this.getAll();
        if (!allItems.length) item.id = 1;
        else {
            const lastItemId = allItems[allItems.length - 1].id;
            item.id = lastItemId + 1;
        }
        item.timestamp = Date.now();
        allItems.push(item);
        try {
            await fs.writeFile(this.fileRoute, JSON.stringify(allItems));
            return item;
        } catch (error) {
            console.error(error);
        }
    }

    async updateById(newItem, id) {
        const allItems = await this.getAll();
        const updatedItems = allItems.map(item => (item.id == id ? newItem : item));
        try {
            await fs.writeFile(this.fileRoute, JSON.stringify(updatedItems));
            const items = await this.getAll();
            return items;
        } catch (error) {
            console.error(error);
        }
    }

    async getById(id) {
        try {
            const allItems = await this.getAll();
            const filteredItem = allItems.filter(item => item.id === id);
            return filteredItem[0] || null;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getAll() {
        try {
            let items = await fs.readFile(this.fileRoute, 'utf-8');
            if (!items.length) return [];
            return JSON.parse(items);
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteById(id) {
        try {
            const allItems = await this.getAll();
            const filteredItems = allItems.filter(item => item.id !== id);
            await fs.writeFile(this.fileRoute, JSON.stringify(filteredItems));
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = ContenedorArchivo;
