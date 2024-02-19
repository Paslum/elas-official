import * as React from "react";
import Note from "./note"; // Importing the Note component
import { Stack } from "@mui/material"; // Importing Stack component from Material-UI
import { useState } from "react"; // Importing useState hook from React

export default function App({ notesInfo, uid }) {
    // Initializing state for notes using useState hook
    const [notes, setNotes] = useState({
        message: "Server not connected", // Default message if notesInfo is not provided
        notes: notesInfo || [], // Initial array of notes, defaulting to an empty array if notesInfo is not provided
    });

    // Function to remove a note from the notes array
    const removeNote = (oldNote) => {
        setNotes((prevNotes) => ({
            ...prevNotes,
            notes: prevNotes.notes.filter(noteId => noteId !== oldNote),
        }));
    };

    return (
        // Displaying notes in a horizontal stack layout
        <Stack direction="row" spacing={2} sx={{ padding: '4px 0 4px 0', overflowX: 'auto'}}>
            {notes.notes.length > 0 ? (
                // Mapping through the notes array and rendering Note component for each note
                notes.notes.map((noteId) => (
                    <Note key={noteId} noteId={noteId} userId={uid} removeNote={removeNote} />
                ))
            ) : (
                // Displaying a message if there are no notes
                <i>No notes yet.</i>
            )}
        </Stack>
    );
}
