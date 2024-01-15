import * as React from "react";
import Course from "./course";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {getCoursesByUserId} from "../utils/api.js";
import {CreateCourseDialog} from "../my_courses/create.jsx";


export default function app({uid}) {
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
                        My Notes
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
                            >
                                + Add Note
                            </Button>
                        </Grid>
                        <Grid item>
                            {open && (
                                <CreateCourseDialog
                                    isOpen={open}
                                    onClose={handleClose}
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
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                {courses.courses.length !== 0 ?
                    (function courseLoader(courses) {
                        let courseAmount = courses.courses.length;
                        let coursesArr = [];
                        for (let i = 0; i < courseAmount; i++) {
                            coursesArr.push(
                                <Grid item key={i}>
                                    <Course course={courses.courses[i]}/>
                                </Grid>);
                        }
                        return coursesArr;
                    })(courses) : `no courses yet` //BITTE FÜGT HIER NOCH WAS EIN
                }
            </Grid>
        </div>
    );
}
