import React, { useState } from "react";
import { Box, FormControl, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import { createCourse } from "../utils/api.js";

// Component for creating a new course dialog
export const CreateCourseDialog = ({ isOpen, onClose, courses, user_id, updateCourses }) => {
    // State for managing the course title input
    const [courseTitle, setCourseTitle] = useState("");

    // Function to handle adding a new course
    const handleAddCourse = async () => {
        try {
            // Create a new course
            const newCourse = await createCourse(user_id, courseTitle);
            
            // Update the courses list state in app.jsx
            updateCourses(newCourse);

            onClose();
        } catch (error) {
            console.log("Failed to create a new course:", error);
            // Display an error message to the user if needed
        }
    };

    return (
        <Dialog onClose={onClose} open={isOpen} fullWidth>
            {/* Dialog title */}
            <DialogTitle>Add New Course</DialogTitle>
            <DialogContent>
                <Box sx={{ height: 12 }}/>

                {/* Form control for entering course title */}
                <FormControl fullWidth>
                    <TextField
                        label="Course Title"
                        value={courseTitle}
                        onChange={(e) => setCourseTitle(e.target.value)}
                        // Submit on Enter key press
                        onKeyPress={(e) => e.key === 'Enter' && handleAddCourse()}
                        fullWidth
                    />
                </FormControl>
            </DialogContent>
            <DialogActions sx={{ padding: 2 }}>
                {/* Cancel button */}
                <Button
                    onClick={onClose}
                    variant="outlined"
                >
                    Cancel
                </Button>
                {/* Add button */}
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
