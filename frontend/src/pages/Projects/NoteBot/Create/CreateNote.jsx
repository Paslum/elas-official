import React, {useEffect, useState} from "react";
import {Grid, ThemeProvider, Typography, Divider} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FolderIcon from "@mui/icons-material/Folder";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { LayoutSelector } from "./LayoutSelector";
import InputAdornment from '@mui/material/InputAdornment';
import noteBotLogo from "../../../../assets/images/noteBot-logo.png";
import theme, {colors} from "../theme.js";
import {getCoursesByUserId, getUserInfo} from "../utils/api.js";

export default function CreateNote() {
  const [user, setUser] = useState({
    message: "Server not connected",
    user: {
      uid: "",
      name: "",
      username: "",
    },
  });
  const [courses, setCourses] = useState({
    message: "Server not connected",
    courses: [], // Initialize as an empty array
  });

  useEffect(() => {
    let elasUser = JSON.parse(sessionStorage.getItem("elas-user"));
    async function getUserInfoFunction() {
      let response = await getUserInfo(elasUser.id);
      setUser((prevState) => ({
        ...prevState,
        message: response.message,
        user: {
          uid: response.user.uid,
          name: response.user.name,
          username: response.user.username,
        },
      }));
    }
    getUserInfoFunction();
  }, []);

  useEffect(() => {
    async function getCoursesInfoFunction() {
      try {
        let response = await getCoursesByUserId(user.user.uid);
        setCourses(prevState => ({
          ...prevState,
          message: response.message,
          courses: response.course.map(course => ({
            title: course.title,
            courseId: course._id,
            notes: course.notes,
          })),
        }));
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses(prevState => ({
          ...prevState,
          message: "Error fetching courses",
        }));
      }
    }
    getCoursesInfoFunction();
  }, []);

  const [noteTitle, setNoteTitle] = React.useState("");
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
      <ThemeProvider theme={theme}>
        <Grid container justifyContent="center" sx={{ py: 4, px: 2 }}>
          <Grid item
                component="img"
                src={noteBotLogo}
                alt="NoteBot Logo"
                xs={12}
                sm={7}
                md={4}
                sx={{ width: "100%"}}
          />
          <Grid item container direction="column" sx={{
            border: 1,
            borderRadius: 2,
            borderColor: colors.main,
            padding: 3,
          }}>
            <Grid container direction="row" justifyContent="space-between" sx={{marginBottom: 2}}>
              <Grid item container xs spacing={2}>
                <Grid item>
                <TextField
                    label="Note Title"
                    placeholder="New Note"
                    value={noteTitle}
                    onChange={handleTitleChange}
                    size="small"
                    InputProps={{
                      startAdornment: (
                          <InputAdornment position="start">
                            <EditIcon/>
                          </InputAdornment>
                      ),
                    }}
                />
              </Grid>
                <Grid item>
                <Button
                    variant="outlined"
                    style={{
                      height: "100%",
                      color: "black",
                      borderColor: "black",
                      overflow: "hidden",
                    }}
                    onClick={handleNoCourseClick}
                >
                  <FolderIcon/>
                  {selectedCourse || "No Course"}
                </Button>
                <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                  <DialogTitle>Save To Course</DialogTitle>
                  <DialogContent>
                    <Typography>Add to a course from your course list:</Typography>
                    <Select
                        value={selectedCourse}
                        onChange={handleCourseSelect}
                        sx={{ width: "100%" }}
                    >
                      {courses.courses.length > 0 ? (
                      courses.courses.map((course) => (
                          <MenuItem value={course.title}>{course.title}</MenuItem>
                      ))
                      ) : (
                          <MenuItem value="No course">No courses yet</MenuItem>
                      )}
                    </Select>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={handleAddNewCourse}>Add</Button>
                  </DialogActions>
                </Dialog>
              </Grid>
              </Grid>
              <Grid item container xs justifyContent="flex-end">
                <Button variant="contained">
                  <SaveIcon/>
                  Save
                </Button>
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
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );  
}
