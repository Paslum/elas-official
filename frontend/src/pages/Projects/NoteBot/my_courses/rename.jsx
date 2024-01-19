import React, { useState } from "react";
import { Box, FormControl } from "@mui/material";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Stack,
    Button,
} from "@mui/material";
import { updateCourse } from "../utils/api.js";
export const RenameCourseDialog = ({ onClose, courseTitle, handleRename }) => {
    const [newCourseTitle, setNewCourseTitle] = useState(courseTitle);

    const handleRenameCourse = async () => {
        try {
            handleRename(newCourseTitle);
            onClose();
        } catch (error) {
            console.log("Failed to rename the course:", error);
            // Display an error message to the user if needed
        }
    };

    return (
        <Dialog onClose={onClose} open="true" fullWidth>
            <DialogTitle>Rename Course</DialogTitle>
            <DialogContent>
                <Box sx={{ height: 12 }} />

                <FormControl fullWidth>
                    <TextField
                        label="Course Title"
                        value={newCourseTitle}
                        onChange={(e) => setNewCourseTitle(e.target.value)}
                        fullWidth
                    />
                </FormControl>
            </DialogContent>
            <DialogActions sx={{ padding: 2 }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleRenameCourse}
                    variant="contained"
                    disabled={!newCourseTitle}
                >
                    Rename
                </Button>
            </DialogActions>
        </Dialog>
    );
};
