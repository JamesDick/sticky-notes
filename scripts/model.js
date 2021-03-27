'use strict';

class Model {
    /**
     * Gets all notes from the db.
     * @returns A list of notes.
     */
    async getNotes() { 
        /* Request all notes from the server and wait for the response. */
        let res = await fetch('notes/get.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        /* Parse the response as json and return. */
        let notes = await res.json();
        return notes;
    }

    /**
     * Builds a note from a provided input and adds it to the db.
     * @param {string} input The text content of the note. 
     * @returns The note that was added to the db.
     */
    async addNote(input) {
        /* Build the note from the provided input. */
        let note = {
            text: input,
            timestamp: Date.now(),
            colour: Math.floor(Math.random() * 6)
        };

        /* Send the note to the db and wait for the response. */
        let res = await fetch('notes/add.php', {
            method: 'post',
            body: JSON.stringify(note)
        });
        
        /* Parse the response as json and return. */
        let added = await res.json();
        return added;
    }

    /**
     * Deletes a specified note from the db.
     * @param {string} timestamp The timestamp of the note to be deleted.
     * @returns The timestamp of the note that was deleted.
     */
    async deleteNote(timestamp) {
        /* Send the note to be deleted to the db and wait for the response. */
        let res = await fetch('notes/delete.php', {
            method: 'post',
            body: JSON.stringify({timestamp: timestamp})
        });
        
        /* Parse the response as json and return. */
        let deleted = await res.json();
        return deleted.deleted;
    }
}
