import * as React from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MyCourses from "./mycourses";

export default function App() {
  // Beispielzufällige Einträge
  const randomEntries = Array.from({ length: 50 }, (_, index) => ({
    id: index,
    name: `${index + 1}`,
    count: Math.floor(Math.random() * 10),
  }));

  return (
    <div>
      <Box sx={{ flexGrow: 0 }}>
        <Button
          variant="contained"
          style={{ float: "right", backgroundColor: "#ED7D31" }}
        >
          + Add Course
        </Button>
        <Button
          variant="outlined"
          style={{
            float: "right",
            color: "#ED7D31",
            borderColor: "#ED7D31",
            marginRight: 16,
          }}
        >
          Recently Deleted
        </Button>
        <Typography
          variant="subtitle1"
          component="h2"
          sx={{
            fontWeight: "bold",
            color: "Black",
            fontSize: 28,
            paddingBottom: 1,
          }}
        >
          My Courses
        </Typography>
      </Box>
      <Divider />

      {/* Neue Box für Einträge */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f0f0f0",
          padding: 2,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", paddingLeft: 2 }}>
            Title
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              textAlign: "right",
              paddingRight: 2,
              marginLeft: "auto", // Änderung hier
            }}
          >
            Number of notes
          </Typography>
        </Box>

        {randomEntries.map((entry) => (
          <MyCourses courseId={entry.name} />
        ))}
      </Box>
    </div>
  );
}