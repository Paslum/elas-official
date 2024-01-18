import * as React from "react";
import Notes from "../notes/App";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function course( {course, uid} ) {
    return (
        <Paper elevation={0} sx={{ height: 275 }}>
            <Typography
                variant="normalMain"
                component="h2"
            >
                {course.title}
            </Typography>
                <div>
                    <Notes notesInfo={course.notes} uid={uid}/>
                </div>
        </Paper>
    );
}
