"use client";
import { useState } from "react";
import { FaCircle } from "react-icons/fa";

const Page = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: "First Note", content: "This is the first note" },
    { id: 2, title: "Second Note", content: "This is the second note" },
  ]);
  const [selectedNote, setSelectedNote] = useState(notes[0]); // İlk not varsayılan
  const [editedContent, setEditedContent] = useState(selectedNote.content);
  const [editedTitle, setEditedTitle] = useState(selectedNote.title)
  const handleNoteSelect = (note) => {
    setSelectedNote(note);
    setEditedContent(note.content);
    setEditedTitle(note.title)
  };

  const handleSave = () => {
    setNotes(
      notes.map((note) =>
        note.id === selectedNote.id ? { ...note, content: editedContent,title:editedTitle } : note
      )
    );
  };

  return (
    <div className="flex w-full m-10 ">
      <div className="w-3/4 h-full flex flex-col ">
        <h2 className="text-3xl font-extrabold ">Notes</h2>
        <div className="p-4 flex flex-col h-full gap-3 mr-10">
          <textarea 
          className="text-xl font-extrabold  h-6 resize-none overflow-hidden items-center " 
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}></textarea>
          
          <textarea
            className="w-full h-full resize-none ml-3 mr-10"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          ></textarea>
          
        </div>
      </div>
      <div className="w-1/4 h-full flex flex-col justify-between">
        <div className="flex flex-col overflow-scroll scrollbar-hide">
          <h2 className="text-2xl font-extrabold px-7 ">Notes</h2>
          <ul className="space-y-2">
            {notes.map((note,index) => (
               <button 
               key={index}
               className="italic flex items-center px-5 text-gray-400 m-2 w-40 text-left"
                onClick={() => handleNoteSelect(note)}
              >
                <FaCircle className="mr-2 text-Gray-400" />
                {note.title}
              </button>
            ))}
          </ul>
        </div>
        <div>
        <button
            className="bg-slate-400 hover:bg-slate-600 text-white font-bold py-2 px-4 border-b-4 border-slate-500 hover:border-slate-700 rounded w-full" 
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
