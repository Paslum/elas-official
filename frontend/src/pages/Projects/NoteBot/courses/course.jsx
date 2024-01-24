import * as React from "react";
import Notes from "../notes/App";
import {Typography, Grid, Divider, Tooltip} from "@mui/material";

export default function course( {course, uid} ) {
    return (
        <Grid>
            <Grid sx={{height: 40}} container direction="row" spacing={0.5} justifyContent="flex-start" alignItems="center">
                <Grid item >
                    <Typography variant="normalMain">
                        {course.title}
                    </Typography>
                </Grid>
                <Grid item>
                    <Tooltip title="Notes in this Course" enterDelay={500}>
                        <Typography variant="small">
                            ({course.notes.length})
                        </Typography>
                    </Tooltip>
                </Grid>
            </Grid>
            <Divider />
            <Grid>
                <Notes notesInfo={course.notes} uid={uid}/>
            </Grid>
        </Grid>
    );
}
