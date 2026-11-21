import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Note from "../components/Note.jsx";

const STORAGE_TABS_KEY = "akilli-not-tabs";
const STORAGE_NOTES_KEY = "akilli-not-notes";

function Notes() {
  const [tabs, setTabs] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_TABS_KEY);
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : ["Your Notes"];
    } catch {
      return ["Your Notes"];
    }
  });

  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_NOTES_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_TABS_KEY, JSON.stringify(tabs));
    } catch (err) {
      console.error("Sekmeler kaydedilemedi:", err);
    }
  }, [tabs]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_NOTES_KEY, JSON.stringify(notes));
    } catch (err) {
      console.error("Notlar kaydedilemedi:", err);
    }
  }, [notes]);

  const addTab = () => {
    const title = window.prompt(
      "Please enter note tab title",
      `Untitled_${tabs.length}`
    );
    if (!title || !title.trim()) return;
    const trimmed = title.trim();
    if (tabs.includes(trimmed)) {
      window.alert("Bu isimde bir sekme zaten mevcut.");
      return;
    }
    setTabs((prev) => [...prev, trimmed]);
  };

  const updateTab = (index) => {
    const updatedTitle = window.prompt(
      "Please enter note tab title",
      tabs[index]
    );
    if (!updatedTitle || !updatedTitle.trim()) return;

    const oldTitle = tabs[index];
    const newTitle = updatedTitle.trim();

    if (oldTitle !== newTitle && tabs.includes(newTitle)) {
      window.alert("Bu isimde bir sekme zaten mevcut.");
      return;
    }

    setTabs((prev) =>
      prev.map((item, idx) => (idx === index ? newTitle : item))
    );

    setNotes((prev) => {
      if (!Object.prototype.hasOwnProperty.call(prev, oldTitle)) return prev;
      const next = { ...prev };
      next[newTitle] = next[oldTitle];
      if (oldTitle !== newTitle) {
        delete next[oldTitle];
      }
      return next;
    });
  };

  const addNote = (tabTitle, noteText) => {
    if (!noteText || !noteText.trim()) return;
    const newNote = {
      id: `note_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      text: noteText.trim(),
      x: 0,
      y: 0,
      width: 180,
      height: 150,
    };
    setNotes((prev) => ({
      ...prev,
      [tabTitle]: [...(prev[tabTitle] ?? []), newNote],
    }));
  };

  const updateNote = (tabTitle, noteId, updates) => {
    setNotes((prev) => ({
      ...prev,
      [tabTitle]: (prev[tabTitle] ?? []).map((item) =>
        item.id === noteId ? { ...item, ...updates } : item
      ),
    }));
  };

  const removeNote = (tabTitle, noteId) => {
    setNotes((prev) => ({
      ...prev,
      [tabTitle]: (prev[tabTitle] ?? []).filter((item) => item.id !== noteId),
    }));
  };

  return (
    <Tabs>
      <TabList className="react-tabs__tab-list custom-tablist">
        <div className="tabs-left">
          {tabs.map((tab, id) => (
            <Tab onDoubleClick={() => updateTab(id)} key={`tab_${id}`}>
              {tab}
            </Tab>
          ))}
          <button
            type="button"
            className="add-tab-btn"
            onClick={addTab}
            aria-label="Add tab"
            title="Yeni Sekme Ekle"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>

        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Notlarda ara..."
            aria-label="Notlarda ara"
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchQuery("")}
              title="Aramayı temizle"
            >
              ×
            </button>
          )}
        </div>
      </TabList>

      {tabs.map((tab, id) => {
        const tabNotes = notes[tab] ?? [];
        const filteredNotes = searchQuery.trim()
          ? tabNotes.filter((n) =>
              n.text.toLowerCase().includes(searchQuery.trim().toLowerCase())
            )
          : tabNotes;

        return (
          <TabPanel key={`tab_content_${id}`}>
            <Note
              notes={filteredNotes}
              addNote={(text) => addNote(tab, text)}
              updateNote={(noteId, updates) => updateNote(tab, noteId, updates)}
              removeNote={(noteId) => removeNote(tab, noteId)}
            />
          </TabPanel>
        );
      })}
    </Tabs>
  );
}

export default Notes;
