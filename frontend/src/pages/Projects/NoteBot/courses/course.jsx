import * as React from "react";
import Notes from "../notes/App";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function course( {courseId} ) {
    return (
        <Paper elevation={0} sx={{ height: 275 }}>
            <Typography
                variant="subtitle1"
                component="h2"
                sx={{
                    color: "#ED7D31",
                    fontSize: 18,
                    paddingTop: 1,
                }}
            >
                My Course #{courseId}
            </Typography>
            <div style={{ overflowX: "auto" }}>
                <Notes/>
            </div>
        </Paper>
    );
}
