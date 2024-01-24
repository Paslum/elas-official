import React, {useEffect, useState} from "react";
import {Grid, ThemeProvider, Typography, Divider} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FolderIcon from "@mui/icons-material/Folder";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import TextFieldsIcon from "@mui/icons-material/TextFields";
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
import {getCoursesByUserId, getUserInfo, createNote, updateCourse} from "../utils/api.js";
import {useNavigate} from "react-router-dom";
import {enqueueSnackbar} from "notistack";

export default function CreateNote() {
  const navigate = useNavigate();
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

      // Nachdem die Benutzerinformationen abgerufen wurden, rufen Sie die Funktion zur Abfrage von Kursen auf.
      getCoursesInfoFunction(response.user.uid);
    }

    async function getCoursesInfoFunction(userId) {
      try {
        let response = await getCoursesByUserId(userId);
        setCourses((prevState) => ({
          ...prevState,
          message: response.message,
          courses: response.course.map((course) => ({
            title: course.title,
            courseId: course._id,
            notes: course.notes,
          })),
        }));
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses((prevState) => ({
          ...prevState,
          message: "Error fetching courses",
        }));
      }
    }

    getUserInfoFunction();
  }, []);


  const [noteTitle, setNoteTitle] = React.useState("");
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [selectedCourse, setSelectedCourse] = React.useState([]);
  const [newCourse, setNewCourse] = React.useState([]);
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

  const handleAddToCourse = () => {
    setNewCourse(selectedCourse);
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

  const handleSave = async() => {
    let title = noteTitle;
    try {
      if (newCourse.length === 0) {
        enqueueSnackbar(`Please assign a course`, {
        variant: "error",
        autoHideDuration: 2500,
      });}
      else {
        if (title === "") {
          const currentDate = new Date();
          const formattedDate = `${currentDate.toLocaleDateString()}, ${currentDate.toLocaleTimeString()}`;
          title = `New Note ${formattedDate}`;
        }

        await createNote(user.user.uid, title, newCourse.courseId);
        navigate('/projects/notebot');
        enqueueSnackbar(`Note \"${title}\" created`, {
          variant: "success",
          autoHideDuration: 2000,
        });
      }
    } catch(error){
      enqueueSnackbar(`Failed to save \"${title}\"`, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
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
                  {newCourse.title || "No Course"}
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
                          <MenuItem value={course}>{course.title}</MenuItem>
                      ))
                      ) : (
                          <MenuItem value="No course">No courses yet</MenuItem>
                      )}
                    </Select>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={handleAddToCourse}>Add</Button>
                  </DialogActions>
                </Dialog>
              </Grid>
              </Grid>
              <Grid item container xs justifyContent="flex-end">
                <Button variant="contained" onClick={handleSave}>
                  <SaveIcon/>
                  Save
                </Button>
              </Grid>
            </Grid>
            {isLayoutSelectorVisible ? (
                <React.Fragment>
                  <Divider />
                  {selectedLayout ? (
                      <Grid container sx={{
                        border: 1,
                        borderRadius: 2,
                        borderColor: '#ED7D31',
                        padding: 2,
                        marginTop: 2,
                      }}>
                        {selectedLayout.map((column, index) => (
                            <Grid item container xs={column} key={index} justifyContent="center" alignItems="center"
                                  sx={{
                                    height: 250,
                                    border: "dashed 2px",
                                    borderRadius: 2,
                                    borderColor: '#A5A5A5',
                                  }}>
                                {textFieldContent ? (
                                    <TextField
                                        multiline
                                        fullWidth
                                        value={textFieldContent}
                                        onChange={(e) => setTextFieldContent(e.target.value)}
                                    />
                                ) : (
                                    <Grid item>
                                        <Typography variant="h6">Choose a Widget</Typography>
                                        <Button onClick={handleTextIconClick}>
                                            <TextFieldsIcon style={{ color: "Blue" }}/>
                                        </Button>
                                        <Button onClick={handlePdfIconClick} disabled="true">
                                          <PictureAsPdfIcon/>
                                        </Button>
                                        <Button onClick={handleVideoIconClick} disabled="true">
                                          <VideoLibraryIcon/>
                                        </Button>
                                    </Grid>
                                )}
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
