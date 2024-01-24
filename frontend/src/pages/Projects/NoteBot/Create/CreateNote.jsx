import React from "react";
import { Grid, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FolderIcon from "@mui/icons-material/Folder";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import SaveIcon from "@mui/icons-material/Save";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { LayoutSelector } from "./LayoutSelector";

import noteBotLogo from "../../../../assets/images/noteBot-logo.png";

export default function CreateNote({ uid }) {
  const [noteTitle, setNoteTitle] = React.useState("My Notes");
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [selectedCourse, setSelectedCourse] = React.useState("");
  const [newCourse, setNewCourse] = React.useState("");
  const [selectedLayout, setSelectedLayout] = React.useState(null);

  const handleTitleChange = (event) => {
    setNoteTitle(event.target.value);
  };

  const handleNoCourseClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleCourseSelect = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleNewCourseChange = (event) => {
    setNewCourse(event.target.value);
  };

  const handleAddNewCourse = () => {
    setSelectedCourse(newCourse);
    setDialogOpen(false);
  };

  const handleLayoutSelect = (columns) => {
    setSelectedLayout(columns);
  };

  const [textFieldContent, setTextFieldContent] = React.useState(""); // Hinzugefügt

  const handleTextIconClick = () => {
    // Fügen Sie hier die Aktion für das Text-Icon hinzu
    console.log("Text Icon clicked");
    setTextFieldContent("");
  };

  const handlePdfIconClick = () => {
    // Fügen Sie hier die Aktion für das PDF-Icon hinzu
    console.log("PDF Icon clicked");
  };

  const handleVideoIconClick = () => {
    // Fügen Sie hier die Aktion für das Video-Icon hinzu
    console.log("Video Icon clicked");
  };

  const [isLayoutSelectorVisible, setLayoutSelectorVisible] =
    React.useState(true);

  const handleShowLayoutSelector = () => {
    setLayoutSelectorVisible(true);
    setSelectedLayout(null);
  };

  return (
    <div>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <TextField
            margin="dense"
            value={noteTitle}
            onChange={handleTitleChange}
            sx={{
              width: "200px",
              display: "flex",
              alignItems: "center",
              paddingLeft: "8px",
            }}
            InputProps={{
              startAdornment: <EditIcon sx={{ marginRight: 1 }} />,
            }}
          />
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            style={{
              color: "black",
              borderColor: "black",
              paddingLeft: "15px", // Adjust the left margin
              width: "160px",
              whiteSpace: "nowrap", // Prevent text from wrapping
              overflow: "hidden", // Hide any overflowing text
              textOverflow: "ellipsis", // Display an ellipsis (...) for overflow
            }}
            startIcon={<FolderIcon sx={{ fontSize: 20, color: "black" }} />}
            onClick={handleNoCourseClick}
          >
            {selectedCourse || "No Course"}
          </Button>
          <Dialog open={isDialogOpen} onClose={handleDialogClose}>
            <DialogTitle>Save To Course</DialogTitle>
            <DialogContent>
              <Typography>Add to a course from your course list:</Typography>
              <Select
                value={selectedCourse}
                onChange={handleCourseSelect}
                style={{ width: "100%" }}
              >
                <MenuItem value="">Select a course</MenuItem>
                <MenuItem value="Course 1">Course 1</MenuItem>
                <MenuItem value="Course 2">Course 2</MenuItem>
                {/* Weitere Kurse können hier hinzugefügt werden */}
              </Select>
              <Typography mt={2}>Add to a new course:</Typography>
              <TextField
                label="New Course"
                variant="outlined"
                fullWidth
                value={newCourse}
                onChange={handleNewCourseChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Cancel</Button>
              <Button onClick={handleAddNewCourse}>Add</Button>
            </DialogActions>
          </Dialog>
        </Grid>
        <Grid item>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <Button
                variant="outlined"
                style={{
                  color: "#ED7D31",
                  borderColor: "#ED7D31",
                }}
                startIcon={<ShareIcon sx={{ fontSize: 28 }} />}
              >
                Share
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#ED7D31",
                  color: "white",
                }}
                startIcon={<SaveIcon sx={{ fontSize: 28, color: "white" }} />}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
      {isLayoutSelectorVisible ? (
        <React.Fragment>
          {selectedLayout ? (
            <Grid container spacing={2}>
              {selectedLayout.map((column, index) => (
                <Grid item xs={column} key={index}>
                  {/* Hier können Sie den Inhalt für jedes Layout-Feld rendern */}
                  <Paper
                    style={{
                      height: "300%", // Ändern Sie die Höhe nach Bedarf
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {textFieldContent ? (
                      <TextField
                        multiline
                        fullWidth
                        value={textFieldContent}
                        onChange={(e) => setTextFieldContent(e.target.value)}
                      />
                    ) : (
                      <>
                        <Typography variant="h6">Choose a Widget</Typography>
                        <div style={{ marginTop: 16 }}>
                          <Button onClick={handleTextIconClick}>
                            <TextFieldsIcon
                              style={{ fontSize: 48, color: "Blue" }}
                            />
                          </Button>
                          <Button onClick={handlePdfIconClick}>
                            <PictureAsPdfIcon
                              style={{ fontSize: 48, color: "#ED7D31" }}
                            />
                          </Button>
                          <Button onClick={handleVideoIconClick}>
                            <VideoLibraryIcon
                              style={{ fontSize: 48, color: "red" }}
                            />
                          </Button>
                        </div>
                      </>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ) : (
            <LayoutSelector onLayoutSelect={handleLayoutSelect} />
          )}
          <Divider />
          <Button onClick={handleShowLayoutSelector}>Create New Layout</Button>
        </React.Fragment>
      ) : (
        <LayoutSelector onLayoutSelect={handleLayoutSelect} />
      )}
    </div>
  );  
}
