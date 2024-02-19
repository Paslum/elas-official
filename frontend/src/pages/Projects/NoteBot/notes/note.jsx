import * as React from "react";
import {Grid, Typography, IconButton, Tooltip} from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIconFilled from "@mui/icons-material/Favorite";
import { colors } from "../theme.js";
import {addFavNote, deleteNote, getNoteById, isFavNote, remFavNote} from "../utils/api.js";
import {useEffect, useState} from "react";
import { useSnackbar } from "notistack";
import {useNavigate} from "react-router-dom";

// Note component responsible for rendering individual notes
export default function Note({ noteId, removeNote, userId }) {
    const navigate = useNavigate(); // Hook for programmatic navigation
    const { enqueueSnackbar } = useSnackbar(); // Hook for displaying snackbars

    // State for note data and favorite status
    const [note, setNote] = useState({
        message: "Server not connected",
        note: [], // Initialize as an empty array
    });

    const [favorite, setFavorite] = useState({
        favorite: false,
    });

    // Function to handle deletion of a note
    const handleDelete = async () => {
        try {
            // Delete the note via API call
            await deleteNote(noteId);
            // Update UI by removing the deleted note
            removeNote(noteId);
            // Display success message
            enqueueSnackbar(`Note "${note.note.title}" deleted`, {
                variant: "success",
                autoHideDuration: 2000,
            });
        } catch (error) {
            // Display error message if deletion fails
            enqueueSnackbar(`Failed to delete "${note.note.title}"`, {
                variant: "error",
                autoHideDuration: 2000,
            });
        }
    };

    // Function to handle adding/removing note from favorites
    const handleFavorite = async () => {
        try {
            if (favorite.favorite) {
                // Remove note from favorites if it's already favorited
                await remFavNote(userId, noteId);
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
                enqueueSnackbar(`Note "${note.note.title}" removed from Favorites`, {
                    variant: "success",
                    autoHideDuration: 2000,
                });
                return;
            }
            // Add note to favorites if it's not favorited
            await addFavNote(userId, noteId);
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
            enqueueSnackbar(`Note "${note.note.title}" added to Favorites`, {
                variant: "success",
                autoHideDuration: 2000,
            });

        } catch (error) {
            // Display error message if operation fails
            enqueueSnackbar(`Failed to add/remove Note "${note.note.title}" to Favorites`, {
                variant: "error",
                autoHideDuration: 2000,
            });
        }
    };

    // Fetch note information when component mounts
    useEffect(() => {
        async function getNoteInfoFunction(noteId) {
            try {
                let response = await getNoteById(noteId);
                if (response.note) {
                    setNote(prevState => ({
                        ...prevState,
                        message: response.message,
                        note: ({
                            title: response.note.title,
                            noteId: response.note._id,
                            favorites: response.note.favorites,
                        }),
                    }));
                    // Check if the note is favorited by the user
                    const isFavorite = await isFavNote(userId, noteId);
                    setFavorite(prevState => ({
                        ...prevState,
                        favorite: isFavorite,
                    }));
                } else {
                    // Display error message if note fetching fails
                    setNote(prevState => ({
                        ...prevState,
                        message: "Error fetching Note",
                    }));
                }
            } catch (error) {
                // Display error message if fetching fails
                console.error("Error fetching Note:", error);
                setNote(prevState => ({
                    ...prevState,
                    message: "Error fetching Note",
                }));
            }
        }
        getNoteInfoFunction(noteId);
    }, []);

    return (
        // Container for rendering note UI
        <Grid direction="column" justifyContent="space-between" container sx={{
            backgroundColor: colors.note,
            borderRadius: 4,
            padding: 1,
            minWidth: 333,
            maxWidth: 333,
            height: 220,
        }}>
            {/* Container for delete and favorite buttons */}
            <Grid item container justifyContent="flex-end">
            </Grid>
            {/* Container for note title */}
            <Grid item container justifyContent="center" onClick={() => navigate(`/projects/notebot/edit/${noteId}`)}
                sx={{ cursor: 'pointer' }}>
                <Grid item>
                    {/* Tooltip for viewing/editing note */}
                    <Tooltip title="View/Edit Note" enterDelay={500}>
                        <Typography variant="bigBlue">
                            {note.note.title}
                        </Typography>
                    </Tooltip>
                </Grid>
            </Grid>
            {/* Container for favorite and delete buttons */}
            <Grid item container justifyContent="space-between" alignItems="flex-end">
                {/* Container for favorite button */}
                <Grid item>
                    <IconButton onClick={handleFavorite} aria-label="Favor Note">
                        {/* Display favorite count and icon */}
                        <Typography variant="normal">
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
                </Grid>
                {/* Container for delete button */}
                <Grid item>
                    {/* Tooltip for deleting note */}
                    <Tooltip title="Delete Note" enterDelay={500}>
                        <IconButton onClick={handleDelete} aria-label="Delete Note">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        </Grid>
    );
}
