import * as React from "react";
import Note from "./note";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { getCoursesByUserId, getNoteById } from "../utils/api.js";

export default function App({ notesInfo }) {
    const [notes, setNotes] = useState({
        message: "Server not connected",
        notes: notesInfo || [],
    });

    const removeNote = (oldNote) => {
        setNotes((prevNotes) => {
            const updatedNotes = prevNotes.notes.filter(noteId => noteId !== oldNote);
            return {
                ...prevNotes,
                notes: updatedNotes,
            };
        });
    };

    return (
        <div style={{ overflowX: 'auto' }}>
            <Stack direction="row" spacing={2} sx={{ padding: '4px 0 4px 0' }}>
                {notes.notes.map((noteId) => (
                    <Note key={noteId} noteId={noteId} removeNote={removeNote} />
                ))}
            </Stack>
        </div>
    );
}
