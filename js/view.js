'use strict';

class View {
    constructor() {
        this._input = $('#input');
        this._addNoteBtn = $('#add-note-btn');
        this._notesLst = $('#notes-lst');
        this._colours = [
            'primary',
            'secondary',
            'success',
            'info',
            'warning',
            'danger'
        ];
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
        this._notesLst.append(this._createCard(note, deleteHandler));
    }

    removeNote(timestamp) {
        $(`#${timestamp}`).remove();
    }

    _createCard(note, deleteHandler) {
        let card = 
            $('<div/>')
            .addClass(`card bg-${this._colours[note.colour]}`)
            .attr({ 
                'id': note.timestamp
            })
            .append(
                $('<div/>')
                .addClass('card-body')
                .append(
                    $('<div/>')
                    .text(note.text)
                    .addClass('card-text')
                )
            )
            .on('click', () => {
                this._showDetailsModal(note, deleteHandler);
            });
    
        return card;
    }

    _showDetailsModal(note, deleteHandler) {
        let modal = 
            $('<div/>')
            .addClass('modal fade')
            .attr({
                'id': 'details-modal',
                'tabindex': '-1',
                'role': 'dialog',
                'aria-hidden': 'true'
            });

        let dialog = 
            $('<div/>')
            .addClass('modal-dialog')
            .attr({
                'role': 'document'
            });
               
        let content = 
            $('<div/>')
            .addClass(`modal-content bg-${this._colours[note.colour]}`);

        let header =
            $('<div/>')
            .addClass('modal-header')
            .append(
                $('<h5/>')
                .text('Note'),

                $('<button/>')
                .addClass('close')
                .append(
                    $('<span/>')
                    .html('&times;')
                )
                .on('click', () => {
                    modal.modal('hide');
                })
            );

        let body = 
            $('<div/>')
            .addClass('modal-body')
            .append(
                $('<p/>')
                .text(note.text)
            );


        let footer = 
            $('<div/>')
            .addClass('modal-footer')
            .append(
                $('<i/>')
                .addClass('fas fa-trash')
                .css('fontSize', '1.5rem')
                .on('click', () => { 
                    if (confirm('Delete this note?')) {
                        modal.modal('hide');
                        deleteHandler(note.timestamp);
                    } 
            }));

        content.append(header, body, footer);
        dialog.append(content);
        modal.append(dialog);

        modal.modal('show');
    }
}
