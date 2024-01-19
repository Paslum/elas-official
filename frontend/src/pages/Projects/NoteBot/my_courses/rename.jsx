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
export const RenameCourseDialog = ({ isOpen, onClose, courseId, courseTitle, updateCourses, handleRename }) => {
    const [newCourseTitle, setNewCourseTitle] = useState(courseTitle);

    const handleRenameCourse = async () => {
        try {
            // Assuming courseId and newCourseTitle are part of the component state
            const updatedCourse = await updateCourse(courseId, newCourseTitle);
            handleRename(newCourseTitle);
            onClose();
        } catch (error) {
            console.log("Failed to rename the course:", error);
            // Display an error message to the user if needed
        }
    };

    return (
        <Dialog onClose={onClose} open={isOpen} fullWidth>
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
