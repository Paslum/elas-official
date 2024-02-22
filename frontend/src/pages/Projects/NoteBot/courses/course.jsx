import * as React from "react";
import Notes from "../notes/App";
import {Typography, Grid, Divider, Tooltip} from "@mui/material";

// Course component responsible for rendering individual courses
export default function course({course, uid}) {
    return (
        <Grid>
            {/* Container for course title and note count */}
            <Grid sx={{height: 40}} container direction="row" spacing={0.5} justifyContent="flex-start" alignItems="center">
                <Grid item >
                    {/* Display course title */}
                    <Typography variant="normalMain">
                        {course.title}
                    </Typography>
                </Grid>
                <Grid item>
                    {/* Display note count with tooltip */}
                    <Tooltip title="Notes in this Course" enterDelay={500}>
                        <Typography variant="small">
                            ({course.notes.length})
                        </Typography>
                    </Tooltip>
                </Grid>
            </Grid>
            {/* Divider */}
            <Divider />
            <Grid>
                {/* Render Notes component */}
                <Notes notesInfo={course.notes} uid={uid}/>
            </Grid>
        </Grid>
    );
}
