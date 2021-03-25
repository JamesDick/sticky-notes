'use strict';

class DB {
    constructor() {
        this._db;
        this._dbName = 'sticky-notes';
        this._ver = 1;
        this._DEBUG = true;
    }
    
    initDb(callback) {
        let req = indexedDB.open(this._dbName, this._ver);

        req.onupgradeneeded = event => {
            if (this._DEBUG) {
                console.log('Creating db...');
            }

            this._db = event.target.result;
            this._db.createObjectStore('notes');
        };

        req.onsuccess = event => {
            if (this._DEBUG) {
                console.log('Successfully initialised db!')
            }
            
            this._db = event.target.result;
            callback();
        };

        req.onerror = event => {
            alert('Error initialising db, details in console.')
            console.log(event);
        };
    }
    
    getNotes(callback) {
        if (this._DEBUG) {
            console.log('Loading notes from db...');
        }

        let notes = this._db.transaction('notes', 'readonly')
                            .objectStore('notes');
                          
        let req = notes.getAll();

        req.onsuccess = event => {
            if (this._DEBUG) {
                console.log('Successfully loaded all notes.');
            }
            
            callback(event.target.result);
        };

        req.onerror = event => {
            alert('Error loading notes, details in console.');
            console.log(event);
        };
    }

    addNote(note, callback) {
        if (this._DEBUG) {
            console.log('Adding note to db:');
            console.log(note);
        }

        let notes = this._db.transaction('notes', 'readwrite')
                            .objectStore('notes');

        let req = notes.put(note, note.timestamp);

        req.onsuccess = event => {
            if (this._DEBUG) {
                console.log('Successfully added note to db.');
                console.log(event);
            }

            callback(note);
        };

        req.onerror = event => {
            alert('Error adding note, details in console.');
            console.log(event);
        };
    }

    deleteNote(timestamp, callback) {
        if (this._DEBUG) {
            console.log('Deleting note from the db:', timestamp);
        }

        let notes = this._db.transaction('notes', 'readwrite')
                            .objectStore('notes');

        let req = notes.delete(timestamp);

        req.onsuccess = event => {
            if (this._DEBUG) {
                console.log('Successfully deleted note from db.');
                console.log(event);
            }

            callback(timestamp);
        };

        req.onerror = event => {
            alert('Error deleting note, details in console.');
            console.log(event);
        }
    }
}
