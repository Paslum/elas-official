import * as React from "react";
import {Tooltip, Box, Divider, Grid, IconButton, Typography} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {useState} from "react";
import {deleteCourse, updateCourse} from "../utils/api.js";
import { RenameCourseDialog } from "./rename.jsx";
import {enqueueSnackbar} from "notistack";

// Component for rendering user's courses
export default function MyCourses({ course, removeCourses, updateCourses}) {
  // State for managing the dialog state for renaming course
  const renameCourse = useDialogState();

  // State for managing the course title
  const [courseTitle, setCourseTitle] = useState({
    title: course.title,
  });

  // Function to handle renaming of the course
  const handleRename = async (title) => {
    try {
      // Update course title
      await updateCourse(course.courseId, title);
      setCourseTitle(prevState => ({
        ...prevState,
        title: title,
      }));
      // Display success message
      enqueueSnackbar(`Course "${courseTitle.title}" renamed`, {
        variant: "success",
        autoHideDuration: 2000,
      });
    } catch(error){
      // Display error message if failed to rename course
      enqueueSnackbar(`Failed to rename "${courseTitle.title}"`, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  }

  // Function to handle deletion of the course
  const handleDelete = async () => {
    try {
      // Delete the course
      await deleteCourse(course.courseId);
      removeCourses(course.courseId);
      // Display success message
      enqueueSnackbar(`Course "${courseTitle.title}" deleted`, {
        variant: "success",
        autoHideDuration: 2000,
      });
    } catch(error){
      // Display error message if failed to delete course
      enqueueSnackbar(`Failed to delete "${courseTitle.title}"`, {
        variant: "error",
        autoHideDuration: 2000,
      });
    };
  };

  return (
    <Box>
      <Divider />
      {/* Container for course details */}
      <Grid container alignItems="center" justifyContent="space-between"  sx={{ height: 60 }}>
        <Grid item>
          {/* Container for edit and course title */}
          <Grid container alignItems="center">
            <Grid item>
              {/* Button to open rename course dialog */}
              <Tooltip title="Rename Course" enterDelay={500}>
                <IconButton onClick={() => {renameCourse.handleOpen()}}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Grid item>
                {/* Render RenameCourseDialog if open */}
                {renameCourse.open && (
                    <RenameCourseDialog
                        onClose={renameCourse.handleClose}
                        courseTitle={courseTitle.title}
                        handleRename={handleRename}
                    />
                )}
              </Grid>
            </Grid>
            <Grid item>
              {/* Display course title */}
              <Typography variant="bigMain">
                {courseTitle.title}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {/* Container for number of notes and delete button */}
          <Grid container alignItems="center">
            <Grid item>
              {/* Display number of notes in the course */}
              <Tooltip title="Notes in this Course" enterDelay={500}>
                <Typography variant="normal">
                  {course.notes?.length ?? 0}
                </Typography>
              </Tooltip>
            </Grid>
            <Grid item>
              {/* Button to delete the course */}
              <Tooltip title="Delete Course" enterDelay={500}>
                <IconButton onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
