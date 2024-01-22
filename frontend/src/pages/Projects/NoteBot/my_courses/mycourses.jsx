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
import {deleteCourse, updateCourse} from "../utils/api.js";
import { RenameCourseDialog } from "./rename.jsx";
import {enqueueSnackbar} from "notistack";
import Tooltip from '@mui/material/Tooltip';

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

  const [courseTitle, setCourseTitle] = useState({
    title: course.title,
  });

  const handleRename = async (title) => {
    try {
      await updateCourse(course.courseId, title);
      setCourseTitle(prevState => ({
        ...prevState,
        title: title,
      }));
      enqueueSnackbar(`Course \"${courseTitle.title}\" renamed`, {
        variant: "success",
        autoHideDuration: 2000,
      });
    } catch(error){
      enqueueSnackbar(`Failed to rename \"${courseTitle.title}\"`, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  }

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
    <Box>
      <Divider />
      <Grid container alignItems="center" justifyContent="space-between"  sx={{ height: 60 }}>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Tooltip title="Rename Course" enterDelay={500}>
                <IconButton onClick={() => {renameCourse.handleOpen()}}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Grid item>
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
              <Typography
                variant="bigMain"
                component="h2"
              >
                {courseTitle.title}
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