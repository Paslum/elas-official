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

export default function mycourses({ course, removeCourses}) {
  const handleDelete = async () => {
    try {
      console.log(course);
      await deleteCourse(course.courseId);
      removeCourses(course.courseId);
    } catch(err){

    };
  };

  return (
    <Box sx={{ height: 75 }}>
      <Divider />
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography
                variant="subtitle1"
                component="h2"
                sx={{
                  fontSize: 18,
                  paddingTop: 1,
                }}
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
                <b>{Math.floor(Math.random() * (10 - 1 + 1)) + 1}</b>
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