import * as React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Notes from "../notes/App";

export default function favorite() {
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
        My Course #{Math.floor(Math.random() * (99 - 1 + 1)) + 1}
      </Typography>
      <div style={{ overflowX: "auto" }}>
        <Notes />
      </div>
    </Paper>
  );
}
