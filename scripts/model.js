'use strict';

class Model {
    /**
     * Opens a connection to the db.
     * If no db exists of the current version, a new one is created.
     * @returns {Promise<IDBDatabase>} An enhanced IndexedDB db that works on Promises.
     */
    async getDB() {
        const db = await idb.openDB('sticky-notes', 2, {
            upgrade(db) {
                const store = db.createObjectStore('notes', { keyPath: 'timestamp' });
                store.createIndex('timestamp', 'timestamp', { unique: true });
            }
        });
        
        return db;
    }

    /**
     * Gets all notes from the db.
     * @returns {Array<object>} A list of notes.
     */
    async getNotes() { 
        let db = await this.getDB();
        return await db.getAll('notes');
    }

    /**
     * Builds a note from a provided input and adds it to the db.
     * @param {string} input The text content of the note. 
     * @returns {object} The note that was added to the db.
     */
    async addNote(input) {
        let note = {
            text: input,
            timestamp: Date.now(),
            colour: Math.floor(Math.random() * 6)
        };

        let db = await this.getDB();        
        await db.put('notes', note);
        return note;
    }

    /**
     * Deletes a specified note from the db.
     * @param {string} timestamp The timestamp of the note to be deleted.
     * @returns {string} The timestamp of the note that was deleted.
     */
    async deleteNote(timestamp) {
        let db = await this.getDB();
        await db.delete('notes', timestamp);
        return timestamp;
    }
}
