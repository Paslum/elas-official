import * as React from "react";
import Note from "./note";
import {Stack} from "@mui/material";
import { useState } from "react";

export default function App({ notesInfo, uid }) {
    const [notes, setNotes] = useState({
        message: "Server not connected",
        notes: notesInfo || [],
    });

    const removeNote = (oldNote) => {
        setNotes((prevNotes) => ({
            ...prevNotes,
            notes: prevNotes.notes.filter(noteId => noteId !== oldNote),
        }));
    };

    return (
            <Stack direction="row" spacing={2} sx={{ padding: '4px 0 4px 0', overflowX: 'auto'}}>
                {notes.notes.length > 0 ? (
                    notes.notes.map((noteId) => (
                        <Note key={noteId} noteId={noteId} userId={uid} removeNote={removeNote} />
                    ))
                ) : (
                        <i>No notes yet.</i>
                )}
            </Stack>
    );
}
