"use client";
import { useState } from "react";
import { FaCircle } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import useNotesStore from "@/lib/stores/notesStore";

const Page = () => {
  const { notes, getNotes, updateNote, createNote, deleteNote } =
    useNotesStore();
  useState(() => {
    getNotes();
  }, []);
  console.log("notes", notes);
  const defaultNote = { title: "", note: "" };

  const [selectedNote, setSelectedNote] = useState(defaultNote);
  const [editedContent, setEditedContent] = useState(selectedNote.note);
  const [editedTitle, setEditedTitle] = useState(selectedNote.title);
  const [IdSelection, setIdSelection] = useState(false);
  const [SelectedId, setSelectedId] = useState("");
  const handleNoteSelect = (note) => {
    setSelectedNote(note);
    setEditedContent(note.note);
    setEditedTitle(note.title);
    setSelectedId(note._id);
    setIdSelection(true);
  };

  const handleTemplate = () => {
    setIdSelection(false);
    setEditedContent(defaultNote.note);
    setEditedTitle(defaultNote.title);
  };

  const handleSave = () => {
    const newNote = {
      title: editedTitle,
      note: editedContent,
    };
    if (IdSelection) {
      updateNote(SelectedId, newNote);
    } else {
      createNote(newNote);
    }
  };

  return (
    <div className="flex w-full m-10 ">
      <div className="w-3/4 h-full flex flex-col ">
        <h2 className="text-3xl font-extrabold ">Notes</h2>
        <div className="p-4 flex flex-col h-full gap-3 mr-10">
          <textarea
            className="text-xl font-extrabold  h-6 resize-none overflow-hidden items-center"
            placeholder="Your Title"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          ></textarea>

          <textarea
            className="w-full h-full resize-none ml-3 mr-10"
            value={editedContent}
            placeholder="Your Content"
            onChange={(e) => setEditedContent(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="w-1/4 h-full flex flex-col justify-between">
        <div className="flex flex-col overflow-scroll scrollbar-hide">
          <h2 className="text-2xl font-extrabold px-7 ">Notes</h2>
          <ul className="space-y-2 mt-5">
             
            {notes?.map((note, index) => (
              <div className="flex justify-between">
              <button
                key={index}
                className="italic flex items-center px-5 text-gray-400 my-1 w-full text-left"
                onClick={() => handleNoteSelect(note)}
              >
                <FaCircle className="mr-2 text-Gray-400" />
                {note.title}
              </button>
               <button className="text-gray-400">
               <MdDelete className="text-xl"  onClick={()=>deleteNote(note._id)}/>
             </button>
             </div>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-3">
        <button
            className="bg-slate-400 hover:bg-slate-600 dark:text-gray-400 text-white font-bold py-2 px-4 dark:bg-zinc-950  rounded w-full items-center flex justify-center"
            onClick={() => handleTemplate()}
            >
              <FaCirclePlus className="mr-2 text-Gray-400 dark:text-gray-400" />
              Create New Note
            </button> 
          <button
            className="bg-slate-400 hover:bg-slate-600 dark:text-gray-400 dark:bg-zinc-950  text-white font-bold py-2 px-4  rounded w-full"
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
