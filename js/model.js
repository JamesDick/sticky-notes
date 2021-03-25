'use strict';

class Model {
    constructor() {
        this._db = new DB();
    }

    initDb(callback) {
        this._db.initDb(callback);
    }

    getNotes(callback) { 
        this._db.getNotes(callback);
    }

    addNote(input, callback) {
        let note = {
            text: input,
            timestamp: Date.now(),
            colour: Math.floor(Math.random() * 6)
        };
        this._db.addNote(note, callback);
    }

    deleteNote(timestamp, callback) {
        this._db.deleteNote(timestamp, callback);
    }
}
