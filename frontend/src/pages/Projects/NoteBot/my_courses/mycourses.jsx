import * as React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import {deleteCourse} from "../utils/api.js";
import { RenameCourseDialog } from "./rename.jsx";

export default function mycourses({ course, removeCourses, updateCourses}) {

  const useDialogState = (initialState = false) => {
    const [open, setOpen] = useState(initialState);

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return {
      open,
      handleOpen,
      handleClose,
    };
  };

  const renameCourse = useDialogState();

  const handleDelete = async () => {
    //Hier vor fehlt noch ein confirmation PopUp
    try {
      await deleteCourse(course.courseId);
      removeCourses(course.courseId);
    } catch(error){
      console.log("Failed to delete course:", error);
    };
  };
  return (
    <Box sx={{ height: 75 }}>
      <Divider />
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <IconButton onClick={() => {renameCourse.handleOpen()}}>
                <EditIcon />
              </IconButton>
              <Grid item>
                {renameCourse.open && (
                    <RenameCourseDialog
                        isOpen={renameCourse.open}
                        onClose={renameCourse.handleClose}
                        courseId={course.courseId}
                        courseTitle={course.title}
                        updateCourses={updateCourses} // updating course list
                    />
                )}
              </Grid>
            </Grid>
            <Grid item>
              <Typography
                variant="bigMain"
                component="h2"
              >
                <b>{course.title}</b>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Typography variant="subtitle1">
                <b>{course.notes?.length ?? 0}</b>
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}