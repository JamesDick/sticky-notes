'use strict';
import { openDB } from 'https://unpkg.com/idb?module';

class Model {
    /**
     * Gets all notes from the db.
     * @returns {Array<object>} A list of notes.
     */
    async getNotes() { 
        let db = await openDB('sticky-notes', 1, upgradeDB => { 
            upgradeDB.createObjectStore('notes')
        });

        let tx = db.transaction('notes', 'readonly');
        let notes = tx.objectStore('notes');

        let notes = await notes.getAll();
        await tx.done;

        db.close();
        return notes;
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

        let db = await openDB('sticky-notes', 1, upgradeDB => { 
            upgradeDB.createObjectStore('notes')
        });

        let tx = db.transaction('notes', 'readwrite');
        let notes = tx.objectStore('notes');

        await db.put('notes', note, note.timestamp);
        await tx.done;

        db.close();
        return note;
    }

    /**
     * Deletes a specified note from the db.
     * @param {string} timestamp The timestamp of the note to be deleted.
     * @returns {string} The timestamp of the note that was deleted.
     */
    async deleteNote(timestamp) {
        let db = await openDB('sticky-notes', 1, upgradeDB => { 
            upgradeDB.createObjectStore('notes')
        });

        let tx = db.transaction('notes', 'readwrite');
        let notes = tx.objectStore('notes');

        await notes.delete(timestamp);
        await tx.done;

        db.close();
        return timestamp;
    }
}
