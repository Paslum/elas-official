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

export const RenameCourseDialog = ({ isOpen, onClose, courseId, courseTitle, updateCourses }) => {
    const [newCourseTitle, setNewCourseTitle] = useState(courseTitle);

    const handleRenameCourse = async () => {
        try {
            // Assuming courseId and newCourseTitle are part of the component state
            const updatedCourse = await updateCourse(courseId, newCourseTitle);

            // Assuming updateCourse returns the updated course information
            // You might need to adjust this based on your actual implementation

            // Update the courses list state in app.jsx
            updateCourses({
                title: updatedCourse.title,
                courseId: updatedCourse._id,
                // Add other properties if needed
            });

            // Close the dialog
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
                    color="primary"
                    onClick={onClose}
                    variant="outlined"
                    disabled={!newCourseTitle}
                >
                    Cancel
                </Button>
                <Button
                    color="primary"
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
