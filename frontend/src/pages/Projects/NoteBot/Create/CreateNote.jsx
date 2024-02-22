import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Grid, ThemeProvider, Typography, Divider, IconButton, Tooltip, Button, TextField,
        Dialog, DialogTitle, DialogContent, DialogActions, InputAdornment, MenuItem, Select
} from "@mui/material";
import { Folder as FolderIcon, Edit as EditIcon, Save as SaveIcon, Favorite as FavoriteIconFilled, FavoriteBorderOutlined as FavoriteIcon
} from "@mui/icons-material";
import noteBotLogo from "../../../../assets/images/noteBot-logo.png";
import theme, {colors} from "../theme.js";
import { getCoursesByUserId, getUserInfo, createNote, getNoteContentById, remFavNote, addFavNote, isFavNote,
} from "../utils/api.js";
import Sections from "./sections/app.jsx";
import {enqueueSnackbar} from "notistack";

// CreateNote component responsible for creating a new note
export default function CreateNote() {
  // Extract noteId from URL params
  const { noteId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  // Initialize noteIdValue as null or noteId from URL
  const noteIdValue = noteId ? noteId : null;

  const navigate = useNavigate();

  // State to manage initial note data
  const [initialNote, setInitialNote] = useState({
    title: "",
    course: "",
    section: [{
      layout: [],
      widget: [{
        data: "",
        type: "",
      }]
    }],
  });

  // State to manage user data
  const [user, setUser] = useState({
    message: "Server not connected",
    user: {
      uid: "",
      name: "",
      username: "",
    },
  });

  // State to manage courses data
  const [courses, setCourses] = useState({
    message: "Server not connected",
    courses: [], // Initialize as an empty array
  });

  // State to manage layout data
  const [layout, setLayout] = useState({
      layout: []
  });

  // State to manage favorite status
  const [favorite, setFavorite] = useState({
    favorite: false,
  });

  // Fetch initial user and courses data
  useEffect(() => {
    let elasUser = JSON.parse(sessionStorage.getItem("elas-user"));

    // Function to fetch user info
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

      getCoursesInfoFunction(response.user.uid);
    }

    // Function to fetch courses info
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

    // Function to fetch note info if noteId exists
    async function getNoteInfoFunction() {
      if (noteIdValue === null) {
        setSectionCounter(1);
        setIsLoading(false);
      } else {
        let note = await getNoteContentById(noteId);
        setInitialNote({
          title: note.title,
          course: note.course,
          section: note.sections,
        });
        setNoteTitle(note.title);
        setNewCourse(note.course);
        setSelectedCourse(note.course);
        setSectionCounter(note.sections.length || 1);
        let indexCounter = 0;
        setLayout((prevState) => ({
          layout: [
            ...note.sections.map(section => ({
              index: indexCounter++,
              layout: section.layout,
            })),
          ],
        }));
        let indexWidgetCounter = 0;
        setWidgets((prevState) => ({
          widget: [
            ...note.sections.map(section => ({
              index: indexWidgetCounter++,
              type: section.widget.type,
              section: "",
              data: section.widget.data,
            })),
          ],
        }));
      };
    };
    getNoteInfoFunction();

    // Function to check if note is favorited by user
    async function checkFavorite() {
      try {
        const isFavorite = await isFavNote(user.user.uid, noteId);
        setFavorite({
          favorite: isFavorite,
        });
      } catch (error) {
        console.error("Error checking favorite:", error);
      }
    }

    checkFavorite();

    setIsLoading(false);

  }, []);

  // State to manage note title
  const [noteTitle, setNoteTitle] = React.useState();
  // State to manage dialog visibility
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  // State to manage selected course
  const [selectedCourse, setSelectedCourse] = React.useState([]);
  // State to manage new course
  const [newCourse, setNewCourse] = React.useState([]);
  // State to manage section counter
  const [sectionCounter, setSectionCounter] = React.useState(0);
  // Function to handle title change
  const handleTitleChange = (event) => {
    setNoteTitle(event.target.value);
  };

  // Function to handle dialog state
  const handleDialogState = () => {
    setDialogOpen(!isDialogOpen);
  };

  // Function to handle course selection
  const handleSelectCourse = (event) => {
    setSelectedCourse(event.target.value);
  };

  // Function to add course
  const handleAddToCourse = () => {
    setNewCourse(selectedCourse);
    setDialogOpen(false);
  };

  // Function to add section
  const handleAddSection = () => {
    setSectionCounter(prevCounter => prevCounter + 1);
    console.log("add section");
    console.log(sectionCounter);
  };

  // Function to add layout
  const handleAddLayout = (index, layout) => {
    setLayout((prevState) => ({
      ...prevState,
      layout: [
        ...prevState.layout,
        {
          index: index,
          layout: layout,
        }
      ],
    }));
  };

  // State to manage widgets
  const [widgets, setWidgets] = React.useState({
    widget: []
  });

  // Function to add widget
  const handleAddWidget = (index, type, section, data) => {
    setWidgets((prevState) => ({
      ...prevState,
      widget: [
        ...prevState.widget,
        {
          index: index,
          type: type,
          section: section,
          data: data,
        }
      ],
    }));
  };

  // Function to set widget content
  const handleSetWidgetContent = (index, data, section) => {
    setWidgets(prevState => ({
      ...prevState,
      widget: prevState.widget.map(widget => {
        if (widget && widget.index === index) {
          if (widget.section === section) {
            return {
              ...widget,
              data: data,
            };
          }
        }
        return widget;
      })
    }));
  };

  // Function to handle note save
  const handleSave = async() => {
    let title = noteTitle;
    try {
      if (newCourse.length === 0) {
        enqueueSnackbar(`Please assign a course`, {
        variant: "error",
        autoHideDuration: 2500,
      });}
      else {
        if (title === "" || title === undefined) {
          const currentDate = new Date();
          const formattedDate = `${currentDate.toLocaleDateString()}, ${currentDate.toLocaleTimeString()}`;
          title = `New Note ${formattedDate}`;
        }
        await createNote(user.user.uid, title, newCourse.courseId, layout, widgets);
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

  // Function to handle note favorite
  const handleFavorite = async () => {
    try {
      if (favorite.favorite) {
        await remFavNote(user.user.uid, noteId)
        setFavorite(prevState => ({
          ...prevState,
          favorite: false,
        }));
        enqueueSnackbar(`Note \"${noteTitle}\" removed from Favorites`, {
          variant: "success",
          autoHideDuration: 2000,
        });
        return;
      }
      await addFavNote(user.user.uid, noteId)
      setFavorite(prevState => ({
        ...prevState,
        favorite: true,
      }));
      enqueueSnackbar(`Note \"${noteTitle}\" added to Favorites`, {
        variant: "success",
        autoHideDuration: 2000,
      });

    } catch(error) {
      enqueueSnackbar(`Failed to add/remove Note \"${noteTitle}\" to Favorites`, {
        variant: "error",
        autoHideDuration: 2000,
      });
    };
  };

  return (
      <div>
      <ThemeProvider theme={theme}>
        <Grid container justifyContent="center" sx={{ px: 2 }}>
          <Grid item
                component="img"
                src={noteBotLogo}
                alt="NoteBot Logo"
                xs={12}
                sm={7}
                md={4}
                sx={{ width: "100%", py: 1}}
          />
          <Grid item container direction="column" sx={{
            width: "100%",
            border: 1,
            borderRadius: 2,
            borderColor: colors.main,
            padding: 3,
          }}>
            <Grid container sx={{marginBottom: 0.25}}>
              <Grid item container xs spacing={2}>
                <Grid item>
                  <TextField
                      label="Note Title"
                      placeholder="New note"
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
                      onClick={handleDialogState}
                  >
                    <FolderIcon/>
                    {newCourse.title || "No Course"}
                  </Button>
                  <Dialog open={isDialogOpen} onClose={handleDialogState}>
                    <DialogTitle>Save To Course</DialogTitle>
                    <DialogContent>
                      <Typography>Add to a course from your course list:</Typography>
                      <Select
                          value={selectedCourse}
                          placeholder="select a course"
                          onChange={handleSelectCourse}
                          sx={{ width: "100%" }}
                      >
                        {courses.courses.length > 0 ? (
                        courses.courses.map((course) => (
                            <MenuItem value={course}>{course.title}</MenuItem>
                        ))
                        ) : (
                            <MenuItem disabled="true" value="No course">No courses yet</MenuItem>
                        )}
                      </Select>
                    </DialogContent>
                    <DialogActions sx={{ padding: 2 }}>
                      <Button variant="outlined" onClick={handleDialogState}>Cancel</Button>
                      <Button variant="contained" onClick={handleAddToCourse}>Add</Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
              </Grid>
              <Grid item container xs direction="row" justifyContent="flex-end">
                {initialNote.title !== "" && (
                    <Grid item>
                      <IconButton onClick={handleFavorite} aria-label="Favor Note">
                        {favorite.favorite ? (
                            <Tooltip title="Unfavorite Note" enterDelay={500}>
                              <FavoriteIconFilled sx={{ color: "red" }} />
                            </Tooltip>
                        ) : (
                            <Tooltip title="Favorite Note" enterDelay={500}>
                              <FavoriteIcon sx={{ color: "red" }} />
                            </Tooltip>
                        )}
                      </IconButton>
                    </Grid>
                )}
                <Grid item>
                  <Button variant="contained" onClick={handleSave}>
                    <SaveIcon/>
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Grid>
              <Divider />
              <Grid item>
                {isLoading === false && (
                    <Sections counter={sectionCounter} addSection={handleAddSection}
                          addLayout={handleAddLayout} addWidget={handleAddWidget}
                          setWidgetContent={handleSetWidgetContent} initialNote={initialNote}/>
                )}
              </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );  
}
