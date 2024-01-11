import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined";
import {getCoursesByUserId, getNoteById} from "../utils/api.js";
import {useEffect, useState} from "react";

export default function note( {noteId} ) {

    const [note, setNote] = useState({
        message: "Server not connected",
        note: [], // Initialize as an empty array
    });

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
        <Card
            sx={{
                width: 333,
                height: 220,
                backgroundColor: "rgba(217, 217, 217, 0.3)",
            }}
        >
            <React.Fragment>
                <IconButton aria-label="Note Settings" sx={{ float: "right" }}>
                    <SettingsIcon />
                </IconButton>
                <CardContent sx={{ height: "333 - 2em" }}>
                    <Typography
                        variant="subtitle1"
                        component="h2"
                        sx={{
                            fontWeight: "bold",
                            color: "#4472C4",
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
                <IconButton aria-label="Delete Note" style={{ float: "right" }}>
                    <DeleteIcon />
                </IconButton>
            </React.Fragment>
        </Card>
    );
}
