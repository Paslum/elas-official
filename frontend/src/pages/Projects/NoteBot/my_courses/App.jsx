import * as React from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MyCourses from "./mycourses";
import Grid from "@mui/material/Grid";
import Course from "../courses/course.jsx";
import {useEffect, useState} from "react";
import {getCoursesByUserId} from "../utils/api.js";
import {CreateCourseDialog} from "./create.jsx";

export default function App({uid}) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [courses, setCourses] = useState({
        message: "Server not connected",
        courses: [], // Initialize as an empty array
    });

    const updateCourses = (newCourse) => {
        setCourses((prevCourses) => ({
            ...prevCourses,
            courses: [...prevCourses.courses, newCourse],
        }));
    };

    useEffect(() => {
        async function getCoursesInfoFunction(userId) {
            try {
                let response = await getCoursesByUserId(userId);
                setCourses(prevState => ({
                    ...prevState,
                    message: response.message,
                    courses: response.course.map(course => ({
                        title: course.title,
                        courseId: course._id,
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
        getCoursesInfoFunction(uid);
    }, []);
  return (
    <div>
      <Box sx={{ flexGrow: 0 }}>
        <Button
          variant="contained"
          style={{ float: "right", backgroundColor: "#ED7D31" }}
          onClick={() => {handleOpen()}}
        >
          + Add Course
        </Button>
          <Grid item>
              {open && (
                  <CreateCourseDialog
                      isOpen={open}
                      onClose={handleClose}
                      courses={courses}
                      user_id={uid}
                      setCourses={setCourses}
                      updateCourses={updateCourses} // Pass the callback function
                  />
              )}
          </Grid>
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
          {courses.courses.length !== 0 ?
          (function courseLoader(courses) {
              let courseAmount = courses.courses.length;
              let coursesArr = [];
              for (let i = 0; i < courseAmount; i++) {
                  coursesArr.push(
                      <MyCourses course={courses.courses[i]}/>);
              }
              return coursesArr;
          })(courses) : `no courses yet` //BITTE FÜGT HIER NOCH WAS EIN
          }
      </Box>
    </div>
  );
}