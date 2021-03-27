'use strict';

class Model {
    constructor() {

    }

    async getNotes() { 
        let res = await fetch('notes/get.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        let notes = await res.json();
        return notes;
    }

    async addNote(input) {
        let note = {
            text: input,
            timestamp: Date.now(),
            colour: Math.floor(Math.random() * 6)
        };

        let res = await fetch('notes/add.php', {
            method: 'post',
            body: JSON.stringify(note)
        });
        
        let added = await res.json();
        return added;
    }

    async deleteNote(timestamp) {
        let res = await fetch('notes/delete.php', {
            method: 'post',
            body: JSON.stringify({timestamp: timestamp})
        });
        
        let deleted = await res.json();
        return deleted.deleted;
    }
}
