import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography
} from "@mui/material";
import {
  Edit as EditIcon,
  Favorite as FavoriteIconFilled,
  FavoriteBorderOutlined as FavoriteIcon,
  Folder as FolderIcon,
  Save as SaveIcon
} from "@mui/icons-material";
import noteBotLogo from "../../../../assets/images/noteBot-logo.png";
import theme, {colors} from "../theme.js";
import {
  addFavNote,
  createNote,
  getCoursesByUserId,
  getNoteContentById,
  getUserInfo,
  isFavNote,
  remFavNote,
  updateNote,
} from "../utils/api.js";
import Sections from "./sections/app.jsx";
import {enqueueSnackbar} from "notistack";

// CreateNote component responsible for creating a new note
export default function CreateNote() {
  // Extract noteId from URL params
  const { noteId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

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
  const [layout, setLayout] = useState([]);

  // State to manage favorite status
  const [favorite, setFavorite] = useState(false);

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
      if (noteId === undefined) {
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
        setLayout((prevState) => ([
            ...note.sections.map(section => ({
              index: indexCounter++,
              layout: section.layout,
            })),]
        ));
        let indexWidgetCounter = 0;
        setWidgets((prevState) => ([
            ...note.sections.flatMap(section =>
              section.widget.map(widget =>  ({
                    index: indexWidgetCounter++,
                    section: section.id,
                    type: widget.type,
                    data: widget.data,
                    _id: widget._id,
                  })),
            ),
          ]));
      };
    };
    getNoteInfoFunction();

    setIsLoading(false);

  }, []);
  if (noteId) {
    // Function to check if note is favorited by user
    async function checkFavorite() {
      try {
        const isFavorite = await isFavNote(user.user.uid, noteId);
        setFavorite(prevState => isFavorite);
      } catch (error) {
        console.error("Error checking favorite:", error);
      }
    }
    checkFavorite();
  }

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
  };

  // Function to add layout
  const handleAddLayout = (index, layout) => {
    setLayout((prevState) => ([
        ...prevState,
        {
          index: index,
          layout: layout,
        }
      ]
    ));
  };

  // State to manage widgets
  const [widgets, setWidgets] = React.useState([]);

  // Function to add widget
  const handleAddWidget = (index, type, section, data) => {
    setWidgets((prevState) => ([
        ...prevState,
        {
          index: index,
          type: type,
          section: section,
          data: data,
        }
      ]
    ));
  };

  // Function to set widget content
  const handleSetWidgetContent = (index, data, section) => {
    setWidgets(prevState => {
      if (!Array.isArray(prevState)) {
        return [];
      }
      return prevState.map(widget => {
        if (widget.index === index && (typeof widget.section === 'string' || widget.section === section)) {
          return {
            ...widget,
            data: data
          };
        }
        return widget;
      });
    });
  };

  // Function to handle note save
  const handleSave = async() => {
    let title = noteTitle ? noteTitle : `New Note ${new Date().toLocaleString()}`;

    try {
      if(noteId) { //Editing Note
        let course = newCourse.courseId ? newCourse : {title: initialNote.course.title, courseId: initialNote.course.id}
        await updateNote(noteId, title, course.courseId, layout, widgets);
      }
      else { //New Note
        if (newCourse.length === 0) {
          enqueueSnackbar(`Please assign a course`, {
            variant: "error",
            autoHideDuration: 2500,
          });
          return;
        } else {
          await createNote(user.user.uid, title, newCourse.courseId, layout, widgets);
        }
      }
    } catch (error) {
      enqueueSnackbar(`Failed to save \"${title}\"`, {
        variant: "error",
        autoHideDuration: 2000,
      });
      return;
    } //Successfull
    enqueueSnackbar(`Note \"${title}\" saved`, {
      variant: "success",
      autoHideDuration: 2000,
    });
    navigate('/projects/notebot');
  }

  // Function to handle note favorite
  const handleFavorite = async () => {
    try {
      if (favorite) {await remFavNote(user.user.uid, noteId)} //Remove from Favorites
      else {await addFavNote(user.user.uid, noteId)} //Add to favorites
      setFavorite(prevState => !prevState);
      enqueueSnackbar(`Note \"${noteTitle}\" 
      ${favorite ? `Note "${noteTitle}" removed from` : `Note "${noteTitle}" added to `} Favorites`, {
        variant: "success",
        autoHideDuration: 2000,
      });
    } catch {
      enqueueSnackbar(`Failed to add/remove Note \"${noteTitle}\" to Favorites`, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
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
                {noteId !== undefined && (
                    <Grid item>
                      <IconButton onClick={handleFavorite} aria-label="Favor Note">
                        {favorite ? (
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
