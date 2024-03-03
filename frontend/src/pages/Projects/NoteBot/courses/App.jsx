import * as React from "react";
import Course from "./course";
import {Grid, Typography, Divider, Button, LinearProgress, Tab, Tooltip} from "@mui/material";
import {useEffect, useState} from "react";
import {getCoursesByUserId} from "../utils/api.js";
import {useNavigate} from "react-router-dom";

// This component represents the main application where users can view and manage their notes
export default function app({uid}) {
    const navigate = useNavigate(); // Hook for programmatic navigation
    const [isLoading, setIsLoading] = useState(true); // State for loading state

    const [courses, setCourses] = useState({
        message: "Server not connected",
        courses: [], // Initialize as an empty array
    });

    useEffect(() => {
        async function getCoursesInfoFunction(userId) {
            try {
                let response = await getCoursesByUserId(userId); // Fetch courses by user ID
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
                setIsLoading(false); // Set loading state to false when done
            }
        }
        getCoursesInfoFunction(uid);
    }, []); // Empty array as dependency, so useEffect runs only once

    return (
        <div>
            {/* Header with title and buttons */}
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                    <Typography variant="heading">
                        My Notes
                    </Typography>
                </Grid>
                <Grid item>
                    <Grid container spacing={1}>
                        <Grid item>
                            {/* Button for recently deleted notes (disabled) */}
                            {/*<Button variant="outlined">
                                Recently Deleted
                            </Button>*/}
                        </Grid>
                        <Grid item>
                            {/* Button to add a new note */}
                            {courses.courses.length > 0 ? (
                                <Button
                                    variant="contained"
                                    onClick={() => navigate("/projects/notebot/create")}
                                >
                                    + Add Note
                                </Button>
                            ) : (
                                <Tooltip title={"Create a Course first!"}>
                                    <Button
                                        variant="contained"
                                        sx={{cursor: 'not-allowed'}}
                                    >
                                        + Add Note
                                    </Button>
                                </Tooltip>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/* Divider */}
            <Divider />
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                {/* Loading progress bar */}
                {isLoading ? (
                    <Grid item sx={{ width: '100%', padding: 10 }}>
                        <LinearProgress />
                    </Grid>
                ) : courses.courses.length !== 0 ? (
                    // Render courses
                    courses.courses.map((course) => (
                        <Grid item key={course.courseId} sx={{ width: '100%' }}>
                            <Course course={course} uid={uid} />
                        </Grid>
                    ))
                ) : (
                    // No notes message
                    <Grid container justifyContent="center" sx={{ width: '100%', padding: 10 }}>
                        <Grid item>
                            <Typography variant="big">
                                No notes yet
                            </Typography>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </div>
    );
}
