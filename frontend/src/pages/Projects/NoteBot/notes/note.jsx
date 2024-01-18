import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined";
import {deleteNote, getNoteById} from "../utils/api.js";
import {useEffect, useState} from "react";
import { useSnackbar } from "notistack";

export default function note( {noteId, removeNote} ) {
    const { enqueueSnackbar } = useSnackbar();

    const [note, setNote] = useState({
        message: "Server not connected",
        note: [], // Initialize as an empty array
    });
    const handleDelete = async () => {
        //Hier vor fehlt noch ein confirmation PopUp
        try {
            await deleteNote(noteId);
            removeNote(noteId);
            enqueueSnackbar(`Note \"${note.note.title}\" deleted`, {
                variant: "success",
                autoHideDuration: 2000,
            });
        } catch(error){
            enqueueSnackbar(`Failed to delete \"${note.note.title}\"`, {
                variant: "error",
                autoHideDuration: 2000,
            });
        };
    };

    useEffect(() => {
        async function getNoteInfoFunction(noteId) {
            try {
                let response = await getNoteById(noteId);
                setNote(prevState => ({
                    ...prevState,
                    message: response.message,
                    note: ({
                        title: response.note.title,
                        noteId: response.note._id,
                    }),
                }));
            } catch (error) {
                console.error("Error fetching Note:", error);
                setNote(prevState => ({
                    ...prevState,
                    message: "Error fetching Note",
                }));
            }
        }
        getNoteInfoFunction(noteId)
    },[]);
    return (
        <Card>
            <React.Fragment>
                <IconButton aria-label="Note Settings" sx={{ float: "right" }}>
                    <SettingsIcon />
                </IconButton>
                <CardContent sx={{ height: "333 - 2em" }}>
                    <Typography
                        variant="bigBlue"
                        component="h2"
                        sx={{
                            padding: "60px",
                            textAlign: "center",
                        }}
                    >
                        {note.note.title}
                    </Typography>
                </CardContent>
                <IconButton aria-label="Favor Note" style={{ float: "left" }}>
                    <FavoriteIcon sx={{ color: "red" }} />
                </IconButton>
                <IconButton onClick={handleDelete} aria-label="Delete Note" style={{ float: "right" }}>
                    <DeleteIcon />
                </IconButton>
            </React.Fragment>
        </Card>
    );
}
