import React, { useState } from "react";
import { Box, FormControl, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, } from "@mui/material";

// Component for renaming a course
export const RenameCourseDialog = ({ onClose, courseTitle, handleRename }) => {
    // State to manage the new course title
    const [newCourseTitle, setNewCourseTitle] = useState(courseTitle);

    // Function to handle the renaming of the course
    const handleRenameCourse = async () => {
        try {
            // Call the handleRename function provided by the parent component
            handleRename(newCourseTitle);
            onClose();
        } catch (error) {
            console.log("Failed to rename the course:", error);
            // Display an error message to the user if needed
        }
    };

    return (
        // Dialog component for renaming course
        <Dialog onClose={onClose} open={true} fullWidth>
            <DialogTitle>Rename Course</DialogTitle>
            <DialogContent>
                {/* Empty space */}
                <Box sx={{ height: 12 }} />

                {/* Form control for entering new course title */}
                <FormControl fullWidth>
                    <TextField
                        label="Course Title"
                        value={newCourseTitle}
                        onChange={(e) => setNewCourseTitle(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleRenameCourse()}
                        fullWidth
                    />
                </FormControl>
            </DialogContent>
            <DialogActions sx={{ padding: 2 }}>
                {/* Button to cancel renaming */}
                <Button
                    onClick={onClose}
                    variant="outlined"
                >
                    Cancel
                </Button>
                {/* Button to confirm renaming */}
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

