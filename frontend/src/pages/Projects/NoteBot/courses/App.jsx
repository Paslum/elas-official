import * as React from "react";
import Course from "./course";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import LinearProgress from '@mui/material/LinearProgress';
import {useEffect, useState} from "react";
import {getCoursesByUserId} from "../utils/api.js";
import {
    Routes,
    Route,
    Navigate,
    useNavigate,
    useLocation,
  } from "react-router-dom";

export default function app({uid}) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

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
                        variant="heading"
                        component="h2"
                    >
                        My Notes
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
                                onClick={() => navigate("/projects/notebot/create")}
                            >
                                + Add Note
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Divider />
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                {isLoading ? (
                    <Grid item sx={{ width: '100%', padding: 10 }}>
                        <LinearProgress />
                    </Grid>
                ) : courses.courses.length !== 0 ? (
                    courses.courses.map((course) => (
                        <Grid item key={course.courseId} sx={{ width: '100%' }}>
                            <Course course={course} uid={uid} />
                        </Grid>
                    ))
                ) : (
                    <Grid container justifyContent="center" sx={{ width: '100%', padding: 10 }}>
                        <Grid item>
                            <Typography
                                variant="big"
                            >No notes yet
                            </Typography>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </div>
    );
}
