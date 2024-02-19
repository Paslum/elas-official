import * as React from "react";
import {Tooltip, Box, Divider, Grid, IconButton, Typography} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {useState} from "react";
import {deleteCourse, updateCourse} from "../utils/api.js";
import { RenameCourseDialog } from "./rename.jsx";
import {enqueueSnackbar} from "notistack";

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
      enqueueSnackbar(`Course \"${courseTitle.title}\" deleted`, {
        variant: "success",
        autoHideDuration: 2000,
      });
    } catch(error){
      enqueueSnackbar(`Failed to delete \"${courseTitle.title}\"`, {
        variant: "error",
        autoHideDuration: 2000,
      });
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
              <Typography variant="bigMain">
                {courseTitle.title}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Tooltip title="Notes in this Course" enterDelay={500}>
                <Typography variant="normal">
                  {course.notes?.length ?? 0}
                </Typography>
              </Tooltip>
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