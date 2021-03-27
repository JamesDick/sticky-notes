'use strict';

$(() => {
    const model = new Model();
    const view = new View();

    const deleteHandler = timestamp => {
        model.deleteNote(timestamp, deleted => {
            view.removeNote(deleted);
        });
    };

    view.setAddNoteBtnHandler(() => {
        model.addNote(view.getInput(), note => {
            view.displayNote(note, deleteHandler);
            view.clearInput();
        });
    });

    model.getNotes(notes => {
        if (notes[0] == undefined) {
            console.log('No notes were loaded from the db.')
            return;
        }
        
        view.displayNotes(notes, deleteHandler);
    });
});
