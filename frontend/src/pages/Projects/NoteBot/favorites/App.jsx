import * as React from "react";
import Note from "../notes/note";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { getFavNotesByUserId} from "../utils/api.js";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Course from "../courses/course.jsx";

export default function App({ uid }) {
    const [notes, setNotes] = useState({
        message: "Server not connected",
        notes: [],
    });

    useEffect(() => {
        async function getNotesInfoFunction(userId) {
            try {
                let response = await getFavNotesByUserId(userId);
                setNotes(prevState => ({
                    ...prevState,
                    message: response.message,
                    notes: response.note.map(note => ({
                        noteId: note._id,
                    })),
                }));
            } catch (error) {
                console.error("Error fetching favorite notes:", error);
                setNotes(prevState => ({
                    ...prevState,
                    message: "Error fetching favorite notes",
                }));
            }
        }
        getNotesInfoFunction(uid);
    }, []);
    const removeNote = (oldNote) => {
        console.log(notes);
        setNotes((prevNotes) => {
            const updatedNotes = prevNotes.notes.filter(noteId => noteId.noteId !== oldNote);
            console.log(updatedNotes);
            return {
                ...prevNotes,
                notes: updatedNotes,
            };
        });
    };
    return (
        <div>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                    <Typography
                        variant="subtitle1"
                        component="h2"
                        sx={{
                            fontWeight: "bold",
                            color: "Black",
                            fontSize: 28,
                            paddingBottom: 1,
                        }}
                    >
                        My Favorites
                    </Typography>
                </Grid>
            </Grid>
            <Divider />
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={{ xs: 2, md: 3 }}
            >
                    {notes.notes.map((noteId) => (
                        <Grid item>
                            <Note key={noteId.noteId} noteId={noteId.noteId} removeNote={removeNote} />
                        </Grid>
                    ))}
            </Grid>
        </div>
    );
}
