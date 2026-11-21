import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faPowerOff,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import { InteractUtils } from "../utils/Index.js";

function Note({ notes = [], addNote, updateNote, removeNote }) {
  const [noteText, setNoteText] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteModalIsOpen, setNoteModalIsOpen] = useState(false);

  useEffect(() => {
    const rootEl = document.getElementById("root");
    if (rootEl) {
      Modal.setAppElement("#root");
    }
  }, []);

  useEffect(() => {
    InteractUtils.setupNoteInteractions(".note", {
      onMoveEnd: (id, { x, y }) => updateNote(id, { x, y }),
      onResizeEnd: (id, { width, height }) => updateNote(id, { width, height }),
    });
  }, [notes]);

  const openCreateModal = () => {
    setEditingNoteId(null);
    setNoteText("");
    setNoteModalIsOpen(true);
  };

  const openEditModal = (noteItem) => {
    setEditingNoteId(noteItem.id);
    setNoteText(noteItem.text);
    setNoteModalIsOpen(true);
  };

  const closeNoteModal = () => {
    setEditingNoteId(null);
    setNoteText("");
    setNoteModalIsOpen(false);
  };

  const handleSaveNote = () => {
    if (!noteText.trim()) return;

    if (editingNoteId) {
      updateNote(editingNoteId, { text: noteText.trim() });
    } else {
      addNote(noteText);
    }
    closeNoteModal();
  };

  const handleDeleteNote = (id) => {
    if (window.confirm("Bu notu silmek istediğinizden emin misiniz?")) {
      removeNote(id);
    }
  };

  return (
    <>
      <div className="notes" onDoubleClick={openCreateModal}>
        {notes.length === 0 && (
          <div className="empty-hint">
            Yeni not eklemek için bu alana çift tıklayın.
          </div>
        )}

        {notes.map((noteItem) => (
          <div
            key={noteItem.id}
            data-id={noteItem.id}
            data-x={noteItem.x}
            data-y={noteItem.y}
            className="note"
            style={{
              transform: `translate(${noteItem.x}px, ${noteItem.y}px)`,
              width: `${noteItem.width}px`,
              height: `${noteItem.height}px`,
            }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              openEditModal(noteItem);
            }}
          >
            <div className="note-header">
              <button
                type="button"
                className="note-action-btn"
                onClick={() => openEditModal(noteItem)}
                title="Notu Düzenle"
                aria-label="Notu Düzenle"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                type="button"
                className="note-action-btn delete"
                onClick={() => handleDeleteNote(noteItem.id)}
                title="Notu Sil"
                aria-label="Notu Sil"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
            <div className="note-body">{noteItem.text}</div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={noteModalIsOpen}
        onRequestClose={closeNoteModal}
        className="note modal"
        shouldCloseOnOverlayClick={false}
      >
        <textarea
          className="noteField"
          rows="6"
          cols="50"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Notunuzu buraya yazın..."
          autoFocus
        />
        <div className="buttons">
          <button
            type="button"
            onClick={handleSaveNote}
            aria-label="Kaydet"
            title="Kaydet"
          >
            <FontAwesomeIcon icon={faSave} />
          </button>
          <button
            type="button"
            onClick={closeNoteModal}
            aria-label="İptal"
            title="İptal"
          >
            <FontAwesomeIcon icon={faPowerOff} />
          </button>
        </div>
      </Modal>
    </>
  );
}

export default Note;
