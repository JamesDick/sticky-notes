'use strict';

$(() => {
    const model = new Model();
    const view = new View();
    
    view.setAddNoteBtnHandler(addNoteBtnHandler);
    displayNotes();

    async function deleteHandler(timestamp) {
        let deleted = await model.deleteNote(timestamp);
        view.removeNote(deleted);
    }
    
    async function addNoteBtnHandler() {
        let newNote = await model.addNote(view.getInput());
        view.displayNote(newNote, deleteHandler);
        view.clearInput();
    }
    
    async function displayNotes() {
        let notes = await model.getNotes();
        view.displayNotes(notes, deleteHandler)
    }
});
