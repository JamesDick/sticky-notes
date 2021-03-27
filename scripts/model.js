'use strict';

class Model {
    getNotes(callback) { 
        fetch('notes/get.php', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(json => {
            console.log('Response to getting notes: ', json);
            callback(json);
        })
    }

    addNote(input, callback) {
        let note = {
            text: input,
            timestamp: Date.now(),
            colour: Math.floor(Math.random() * 6)
        };

        fetch('notes/add.php', {
            method: 'post',
            body: JSON.stringify(note)
        })
        .then(res => res.json())
        .then(json => {
            callback(json);
        })
    }

    deleteNote(timestamp, callback) {
        fetch('notes/delete.php', {
            method: 'post',
            body: JSON.stringify({timestamp: timestamp})
        })
        .then(res => res.json())
        .then(json => {
            callback(json.deleted);
        })
    }
}
