'use strict';

class View {
    constructor() {
        this._input = $('#input');
        this._addNoteBtn = $('#add-note-btn');
        this._notesLst = $('#notes-lst');
    }

    getInput() {
        return this._input.val();
    }

    clearInput() {
        this._input.val('');
    }

    setAddNoteBtnHandler(handler) {
        this._addNoteBtn.on('click', handler);
    }

    displayNotes(notes, deleteHandler) {
        this._notesLst.empty();
        for (let note of notes) {
            this.displayNote(note, deleteHandler);
        }
    }

    displayNote(note, deleteHandler) {
        this._notesLst.append(this._createAlert(note, deleteHandler));
    }

    removeNote(timestamp) {
        $(`#${timestamp}`).remove();
    }

    _createCard(note) {
        /* List of possible bg colours. */
        const bgColours = [
            'bg-primary',
            'bg-secondary',
            'bg-success',
            'bg-info',
            'bg-warning',
            'bg-danger'
        ];
    
        let bgColour = bgColours[note.colour];
    
        /* Build the card that our notes are displayed on. */
        let card = $('<div/>').addClass(`card ${bgColour}`).attr({ 'id': note.timestamp}).append(
                $('<div/>').addClass('card-body').append(
                    $('<div/>').text(note.text).addClass('card-text')
                )
            );
    
        return card;
    }


    _createAlert(note, deleteHandler) {
        const colours = [
            'primary',
            'secondary',
            'success',
            'info',
            'warning',
            'danger'
        ];
    
        let noteDiv =  $('<div/>').addClass(`alert alert-${colours[note.colour]} alert-dismissible fade show`)
                                  .attr({'id': note.timestamp});

        let noteText = $('<p/>').text(note.text);

        let closeBtn = $('<button/>').addClass('close')
                                     .append($('<span/>').html('&times;'))
                                     .on('click', () => { 
                                            if (confirm('Delete this note?')) {
                                                deleteHandler(note.timestamp);
                                            } 
                                     });

        noteDiv.append(noteText, closeBtn);

        return noteDiv;
    }
}
