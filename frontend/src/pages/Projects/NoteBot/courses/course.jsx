import * as React from "react";
import Notes from "../notes/App";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

export default function course( {course, uid} ) {
    return (
        <Paper elevation={0}>
            <Grid sx={{height: 40}} container direction="row" justifyContent="flex-start" alignItems="center">
                <Grid item >
                    <Typography variant="normalMain" component="h2">
                        {course.title}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="small" component="h2">
                        ({course.notes.length})
                    </Typography>
                </Grid>
            </Grid>
            <Divider />
                <div>
                    <Notes notesInfo={course.notes} uid={uid}/>
                </div>
        </Paper>
    );
}
