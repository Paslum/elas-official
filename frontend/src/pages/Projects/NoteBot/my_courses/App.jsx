import * as React from "react";
import { Typography, Divider, Button, Grid, LinearProgress } from "@mui/material";
import MyCourses from "./mycourses";
import { useEffect, useState } from "react";
import { getCoursesByUserId } from "../utils/api.js";
import { CreateCourseDialog } from "./create.jsx";

// Main component for the my_courses Page
export default function App({ uid }) {
    // State for managing loading status
    const [isLoading, setIsLoading] = useState(true);

    // Custom hook for managing dialog state
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

    // State for managing the create course dialog
    const createCourse = useDialogState();

    // State for managing the list of courses
    const [courses, setCourses] = useState({
        message: "Server not connected",
        courses: [], // Initialize as an empty array
    });

    // Function to update the list of courses when a new one is created
    const updateCourses = (newCourse) => {
        setCourses((prevCourses) => ({
            ...prevCourses,
            courses: [...prevCourses.courses, newCourse],
        }));
    };

    // Function to remove a course from the list
    const removeCourses = (oldCourse) => {
        setCourses((prevCourses) => ({
            ...prevCourses,
            courses: prevCourses.courses.filter(course => course.courseId !== oldCourse),
        }));
    };

    // Effect to fetch courses data when component mounts
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
                setIsLoading(false); 
            }
        }
        getCoursesInfoFunction(uid);
    }, []);

    return (
        <div>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                    <Typography variant="heading">
                        My Courses
                    </Typography>
                </Grid>
                <Grid item>
                    <Grid container spacing={1}>
                        <Grid item>
                            <Button variant="outlined" disabled>
                                Recently Deleted
                            </Button>
                        </Grid>
                        {/* Button to add a new course */}
                        <Grid item>
                            <Button variant="contained" onClick={createCourse.handleOpen}>
                                + Add Course
                            </Button>
                        </Grid>
                        {/* Dialog for creating a new course */}
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
            {/* Course list */}
            <Grid container backgroundColor="#f0f0f0" sx={{ borderRadius: 3, marginTop: '20px', padding: 1 }}>
                <Grid container justifyContent="space-between" sx={{ padding: 2 }}>
                    {/* Course title column */}
                    <Grid item>
                        <Typography variant="big">
                            Title
                        </Typography>
                    </Grid>
                    {/* Number of notes column */}
                    <Grid item>
                        <Typography variant="big">
                            Number of Notes
                        </Typography>
                    </Grid>
                </Grid>
                {/* Course cards */}
                <Grid container direction="column" alignItems="stretch">
                    {/* Loading progress bar */}
                    {isLoading ? (
                        <Grid item sx={{ width: '100%', padding: 10 }}>
                            <LinearProgress />
                        </Grid>
                    ) : courses.courses.length !== 0 ? (
                        // Render each course
                        courses.courses.map((course) => (
                            <Grid item key={course.courseId}>
                                <MyCourses course={course} removeCourses={removeCourses} updateCourses={updateCourses} />
                            </Grid>
                        ))
                    ) : (
                        // Render no courses message
                        <Grid container justifyContent="center" sx={{ width: '100%', padding: 10 }}>
                            <Grid item>
                                <Typography variant="big">
                                    No courses yet
                                </Typography>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </div>
    );
}
