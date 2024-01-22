import * as React from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import MyCourses from "./mycourses";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { getCoursesByUserId } from "../utils/api.js";
import { CreateCourseDialog } from "./create.jsx";
import LinearProgress from "@mui/material/LinearProgress";

export default function App({ uid }) {
    const [isLoading, setIsLoading] = useState(true);

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
            } finally {
                setIsLoading(false); // Mark loading as complete
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
                        >
                            Recently Deleted
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={() => {createCourse.handleOpen()}}
                        >
                            + Add Course
                        </Button>
                    </Grid>
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
            <Divider />
            <Grid
                container
                backgroundColor="#f0f0f0"
                sx={{ borderRadius:3, marginTop:'20px', padding:'10px'}}
            >
                <Grid container alignItems="center" justifyContent="space-between" sx={{ display: "flex", height: 60 }}>
                    <Grid item>
                        <Typography variant="big" sx={{ paddingLeft: 2 }}>
                            Title
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography
                            variant="big"
                            sx={{
                                textAlign: "right",
                                paddingRight: 2,
                                marginLeft: "auto",
                            }}
                        >
                            Number of Notes
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container direction="column" justifyContent="flex-start"
                      alignItems="stretch">
                    {isLoading ? (
                        <Grid item sx={{ width: '100%', padding: 10 }}>
                            <LinearProgress />
                        </Grid>
                    ) : courses.courses.length !== 0 ? (
                        courses.courses.map((course) => (
                            <Grid item key={course.courseId}>
                                <MyCourses course={course} removeCourses={removeCourses} updateCourses={updateCourses} />
                            </Grid>
                        ))
                        ) : (
                        <Grid container justifyContent="center" sx={{ width: '100%', padding: 10 }}>
                            <Grid item>
                                <Typography
                                    variant="big"
                                    >No courses yet
                                </Typography>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </div>
    );
}
