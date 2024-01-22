import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIconFilled from "@mui/icons-material/Favorite";
import Tooltip from '@mui/material/Tooltip';


import {addFavNote, deleteNote, getNoteById, isFavNote, remFavNote} from "../utils/api.js";
import {useEffect, useState} from "react";
import { useSnackbar } from "notistack";

export default function note( {noteId, removeNote, userId} ) {
    const { enqueueSnackbar } = useSnackbar();

    const [note, setNote] = useState({
        message: "Server not connected",
        note: [], // Initialize as an empty array
    });

    const [favorite, setFavorite] = useState({
        favorite: false,
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

    const handleFavorite = async () => {
        try {
            if (favorite.favorite) {
                await remFavNote(userId, noteId)
                setNote(prevState => ({
                    ...prevState,
                    note: {
                        ...prevState.note,
                        favorites: prevState.note.favorites - 1,
                    },
                }));
                setFavorite(prevState => ({
                    ...prevState,
                    favorite: false,
                }));
                enqueueSnackbar(`Note \"${note.note.title}\" removed from Favorites`, {
                    variant: "success",
                    autoHideDuration: 2000,
                });
                return;
            }
            await addFavNote(userId, noteId)
            setNote(prevState => ({
                ...prevState,
                note: {
                    ...prevState.note,
                    favorites: prevState.note.favorites + 1,
                },
            }));
            setFavorite(prevState => ({
                ...prevState,
                favorite: true,
            }));
            enqueueSnackbar(`Note \"${note.note.title}\" added to Favorites`, {
                variant: "success",
                autoHideDuration: 2000,
            });

        } catch(error) {
            enqueueSnackbar(`Failed to add/remove Note \"${note.note.title}\" to Favorites`, {
                variant: "error",
                autoHideDuration: 2000,
            });
        };
    };

    useEffect(() => {
        async function getNoteInfoFunction(noteId) {
            try {
                let response = await getNoteById(noteId);
                console.log(response);
                if(response.note) {
                    setNote(prevState => ({
                        ...prevState,
                        message: response.message,
                        note: ({
                            title: response.note.title,
                            noteId: response.note._id,
                            favorites: response.note.favorites,
                        }),
                    }));
                    const isFavorite = await isFavNote(userId, noteId);
                    // Hier setzt du den Zustand mit dem aktualisierten Wert
                    setFavorite(prevState => ({
                        ...prevState,
                        favorite: isFavorite,
                    }));
                } else {
                    setNote(prevState => ({
                        ...prevState,
                        message: "Error fetching Note",
                    }));
                };
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
                <Tooltip title="Delete Note" enterDelay={500}>
                    <IconButton aria-label="Note Settings" sx={{ float: "right" }}>
                        <SettingsIcon />
                    </IconButton>
                </Tooltip>
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
                <IconButton onClick={handleFavorite} aria-label="Favor Note" style={{ float: "left" }}>
                    <Typography
                        variant="normal"
                        component="h2"
                    >
                    {note.note.favorites}
                    </Typography>
                    {favorite.favorite ? (
                        <Tooltip title="Unfavorite Note" enterDelay={500}>
                            <FavoriteIconFilled sx={{ color: "red" }} />
                        </Tooltip>
                    ) : (
                        <Tooltip title="Favorite Note" enterDelay={500}>
                            <FavoriteIcon sx={{ color: "red" }} />
                        </Tooltip>
                    )}
                </IconButton>
                <Tooltip title="Delete Note" enterDelay={500}>
                    <IconButton onClick={handleDelete} aria-label="Delete Note" style={{ float: "right" }}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </React.Fragment>
        </Card>
    );
}
