import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Note from "../organisms/Note";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function Notes() {
  const [notes, setNotes] = useState({});
  const [tabs, setTabs] = useState(["Your Notes"]);

  const addTab = () => {
    const tab = window.prompt(
      "Please enter note tab title",
      `Untitled_${tabs.length}`
    );
    setTabs([...tabs, tab]);
  };

  const addNote = (title, note) => {
    if (notes.hasOwnProperty(title)) {
      notes[title].push(note);
    } else {
      notes[title] = [note];
    }
    setNotes({ ...notes });
  };

  const removeNote = (title, note) => {};

  const updateTab = (id) => {
    const tab = window.prompt("Please enter note tab title", tabs[id]);
    tabs.splice(id, 1, tab);
    setTabs([...tabs]);
  };

  return (
    <Tabs>
      <TabList>
        {tabs.map((tab, id) => (
          <Tab onDoubleClick={() => updateTab(id)} key={`tab_${id}`}>
            {tab}
          </Tab>
        ))}
        <button onClick={() => addTab()}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </TabList>
      {tabs.map((tab, id) => (
        <TabPanel key={`tab_content_${id}`}>
          <Note
            notes={notes[tab]}
            addNote={(note) => addNote(tab, note)}
            removeNote={(note) => removeNote(tab, note)}
          />
        </TabPanel>
      ))}
    </Tabs>
  );
}

export default Notes;
