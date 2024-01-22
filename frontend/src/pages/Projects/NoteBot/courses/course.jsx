import * as React from "react";
import Notes from "../notes/App";
import {Typography, Grid, Divider} from "@mui/material";

export default function course( {course, uid} ) {
    return (
        <Grid>
            <Grid sx={{height: 40}} container direction="row" justifyContent="flex-start" alignItems="center">
                <Grid item >
                    <Typography variant="normalMain">
                        {course.title}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="small">
                        ({course.notes.length})
                    </Typography>
                </Grid>
            </Grid>
            <Divider />
            <Grid>
                <Notes notesInfo={course.notes} uid={uid}/>
            </Grid>
        </Grid>
    );
}
