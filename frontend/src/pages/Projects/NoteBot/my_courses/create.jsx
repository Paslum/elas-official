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
import { createCourse } from "../utils/api.js";

export const CreateCourseDialog = ({ isOpen, onClose, courses, user_id, updateCourses }) => {
    const [courseTitle, setCourseTitle] = useState("");
    const handleAddCourse = async () => {
        try {
            const newCourse = await createCourse(user_id, courseTitle);
            // Update the courses list state in app.jsx
            updateCourses({
                title: newCourse.title,
                courseId: newCourse._id,
            });

            // Close the dialog
            onClose();
        } catch (error) {
            console.log("Failed to create a new course:", error);
        }
    };
    return (
        <Dialog onClose={onClose} open={isOpen} fullWidth>
            <DialogTitle>Add New Course</DialogTitle>
            <DialogContent>
                <Box sx={{height:12}}/>

                <FormControl fullWidth>
                    <TextField
                        label="Course Title"
                        value={courseTitle}
                        onChange={(e) => setCourseTitle(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddCourse()}
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
                    onClick={handleAddCourse}
                    variant="contained"
                    disabled={!courseTitle}
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};
