'use strict';

$(async () => {
    const model = new Model();
    const view = new View();
    
    view.setAddNoteBtnHandler(async () => {
        let newNote = await model.addNote(view.getInput());
        view.displayNote(newNote, deleteHandler);
        view.clearInput();
    });

    let notes = await model.getNotes();
    const deleteHandler = async (timestamp) => {
        let deleted = await model.deleteNote(timestamp);
        view.removeNote(deleted);
    }
    view.displayNotes(notes, deleteHandler);
});
