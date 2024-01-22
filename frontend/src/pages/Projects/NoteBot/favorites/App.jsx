import * as React from "react";
import Note from "../notes/note";
import { useEffect, useState } from "react";
import { getFavNotesByUserId} from "../utils/api.js";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";

export default function App({ uid }) {
    const [isLoading, setIsLoading] = useState(true);

    const [notes, setNotes] = useState({
        message: "Server not connected",
        notes: [],
    });

    useEffect(() => {
        async function getNotesInfoFunction(userId) {
            try {
                let response = await getFavNotesByUserId(userId);
                if(response.note) {
                    setNotes(prevState => ({
                        ...prevState,
                        message: response.message,
                        notes: response.note.map(note => ({
                            noteId: note._id,
                        })),
                    }));
                } else {
                    setNotes(prevState => ({
                        ...prevState,
                        message: response.message,
                    }));
                }
            } catch (error) {
                console.error("Error fetching favorite notes:", error);
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
                justifyContent="flex-start"
                alignItems="center"
                spacing={{ xs: 2, md: 3 }}
                sx={{paddingTop: 3}}
            >
                {isLoading ? (
                    <Grid item sx={{ width: '100%', padding: 10 }}>
                        <LinearProgress />
                    </Grid>
                ) : notes.notes.length === 0 ? (
                    <Grid container justifyContent="center" sx={{ width: '100%', padding: 10 }}>
                        <Grid item>
                            <Typography
                                variant="big"
                            >No favorite notes yet
                            </Typography>
                        </Grid>
                    </Grid>
                ) : (
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
