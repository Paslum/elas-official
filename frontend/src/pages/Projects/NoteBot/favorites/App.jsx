import * as React from "react";
import Note from "../notes/note";
import { useEffect, useState } from "react";
import { getFavNotesByUserId } from "../utils/api.js";
import { Grid, Typography, Divider, LinearProgress } from "@mui/material";

export default function App({ uid }) {
    // State for managing loading status
    const [isLoading, setIsLoading] = useState(true);

    // State for managing the list of favorite notes
    const [notes, setNotes] = useState({
        message: "Server not connected",
        notes: [],
    });

    // Effect to fetch favorite notes data when component mounts
    useEffect(() => {
        async function getNotesInfoFunction(userId) {
            try {
                // Fetch favorite notes data
                let response = await getFavNotesByUserId(userId);
                if (response.note) {
                    // If there are favorite notes, update state
                    setNotes(prevState => ({
                        ...prevState,
                        message: response.message,
                        notes: response.note.map(note => ({
                            noteId: note._id,
                        })),
                    }));
                } else {
                    // If no favorite notes, update state with appropriate message
                    setNotes(prevState => ({
                        ...prevState,
                        message: response.message,
                    }));
                }
            } catch (error) {
                console.error("Error fetching favorite notes:", error);
                // If error occurs during fetching, update state with error message
                setNotes(prevState => ({
                    ...prevState,
                    message: "Error fetching favorite notes",
                }));
            } finally {
                setIsLoading(false); // Mark loading as complete
            }
        }
        getNotesInfoFunction(uid);
    }, []);

    // Function to remove a note from the list of favorite notes
    const removeNote = (oldNote) => {
        setNotes((prevNotes) => {
            const updatedNotes = prevNotes.notes.filter(noteId => noteId.noteId !== oldNote);
            return {
                ...prevNotes,
                notes: updatedNotes,
            };
        });
    };

    return (
        <div>
            {/* Header */}
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                    <Typography variant="heading">
                        My Favorites
                    </Typography>
                </Grid>
            </Grid>
            <Divider />
            {/* Favorite notes list */}
            <Grid
                container
                justifyContent="flex-start"
                alignItems="center"
                spacing={{ xs: 2, md: 3 }}
                sx={{ paddingTop: 3 }}
            >
                {/* Loading progress bar */}
                {isLoading ? (
                    <Grid item sx={{ width: '100%', padding: 10 }}>
                        <LinearProgress />
                    </Grid>
                ) : notes.notes.length === 0 ? (
                    // Message for no favorite notes
                    <Grid container justifyContent="center" sx={{ width: '100%', padding: 10 }}>
                        <Grid item>
                            <Typography variant="big">
                                No favorite notes yet
                            </Typography>
                        </Grid>
                    </Grid>
                ) : (
                    // Render each favorite note
                    notes.notes.map((noteId) => (
                        <Grid item key={noteId.noteId}>
                            <Note noteId={noteId.noteId} userId={uid} removeNote={removeNote} />
                        </Grid>
                    ))
                )}
            </Grid>
        </div>
    );
}
