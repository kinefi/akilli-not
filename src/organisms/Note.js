import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { InteractUtils } from "../utils/Index";
import Modal from "react-modal";

function Note(props) {
  Modal.setAppElement("#root");
  const [note, setNote] = useState("");
  const [noteModalIsOpen, setNoteModalIsOpen] = React.useState(false);

  useEffect(() => {
    InteractUtils.enableDrag();
  });
  const addNote = () => {
    props.addNote(note);
    setNoteModalIsOpen(false);
  };

  const updateNote = (e) => {
    setNote(e.target.value);
  };

  const deleteNote = (note) => {
    if (window.confirm("Bu notu silmek istediğinizden emin misiniz?")) {
      props.removeNote(note);
    }
  };

  const openNoteModal = () => {
    setNoteModalIsOpen(true);
  };

  const closeNoteModal = () => {
    setNoteModalIsOpen(false);
  };

  const renderNotes = () => {
    return props.notes.map((note, id) => (
      <div
        key={`note_${id}`}
        className="note"
        onDoubleClick={() => deleteNote(note)}
      >
        {note}
      </div>
    ));
  };

  const renderNoteModal = () => {
    return (
      <Modal
        isOpen={noteModalIsOpen}
        onRequestClose={closeNoteModal}
        className="note modal"
        shouldCloseOnOverlayClick={false}
      >
        <textarea
          className="noteField"
          rows="4"
          cols="50"
          onChange={(e) => updateNote(e)}
          placeholder="Please enter your note here..."
        ></textarea>
        <div className="buttons">
          <button onClick={() => addNote()}>
            <FontAwesomeIcon icon={faSave} />
          </button>
          <button onClick={() => closeNoteModal()}>
            <FontAwesomeIcon icon={faPowerOff} />
          </button>
        </div>
      </Modal>
    );
  };

  return (
    <React.Fragment>
      <div className="notes" onDoubleClick={() => openNoteModal()}>
        {props.notes && renderNotes()}
      </div>
      {renderNoteModal()}
    </React.Fragment>
  );
}

export default Note;
