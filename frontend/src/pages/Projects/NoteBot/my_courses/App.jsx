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
import { useEffect, useState } from "react";
import { getCoursesByUserId } from "../utils/api.js";
import { CreateCourseDialog } from "./create.jsx";
import { renameCourseDialog } from "./rename.jsx";


export default function App({ uid }) {
    const useDialogState = (initialState = false) => {
        const [open, setOpen] = useState(initialState);

        const handleOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };

        return {
            open,
            handleOpen,
            handleClose,
        };
    };

    const createCourse = useDialogState();

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
    const removeCourses = (oldCourse) => {
        setCourses((prevCourses) => ({
            ...prevCourses,
            courses: prevCourses.courses.filter(course => course.courseId !== oldCourse),
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
        getCoursesInfoFunction(uid);
    }, []);
  return (
    <div>
        <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
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
            </Grid>
            <Grid item>
                <Grid container spacing={1}>
                    <Grid item>
                        <Button
                            variant="outlined"
                            style={{
                                color: "#ED7D31",
                                borderColor: "#ED7D31",
                            }}
                        >
                            Recently Deleted
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            style={{ backgroundColor: "#ED7D31" }}
                            onClick={() => {createCourse.handleOpen()}}
                        >
                            + Add Course
                        </Button>
                    </Grid>
                    <Grid item>
                        {createCourse.open && (
                            <CreateCourseDialog
                                isOpen={createCourse.open}
                                onClose={createCourse.handleClose}
                                courses={courses}
                                user_id={uid}
                                updateCourses={updateCourses} // updating course list
                            />
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
            <Divider />
            {/* Neue Box für Einträge */}
            <Grid
                container
                direction="column"
                justifyContent="space-between"
                alignItems="stretch"
                backgroundColor="#f0f0f0"
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
                                <MyCourses course={courses.courses[i]} removeCourses={removeCourses} />);
                        }
                        return coursesArr;
                    })(courses) : `no courses yet` //BITTE FÜGT HIER NOCH WAS EIN
                }
            </Grid>
        </div>
    );
}
