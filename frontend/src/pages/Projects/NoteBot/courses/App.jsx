import * as React from "react";
import Course from "./course";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {getCoursesByUserId} from "../utils/api.js";
import {CreateCourseDialog} from "./create.jsx";


export default function app({uid}) {
    const [open, setOpen] = useState(true);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [courses, setCourses] = useState({
        message: "Server not connected",
        courses: {
            courseId: "",
        },
    });

    useEffect(() => {
        async function getCoursesInfoFunction(userId) {
            let reponse = await getCoursesByUserId(userId);
            setCourses((prevState) => ({
                ...prevState,
                message: reponse.message,
                courses: {
                    CourseId: reponse.courses.courseId,
                },
            }));
        }
        //getCoursesInfoFunction(uid);
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
                                    setCourses={setCourses}
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
                {(function courses() {
                    let courseAmount = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
                    let courses = [];
                    for (let i = 0; i < courseAmount; i++) {
                        let courseId = Math.floor(Math.random() * (99 - 1 + 1)) + 1;
                        courses.push(
                            <Grid item key={courseId}>
                                <Course courseId={courseId}/>
                            </Grid>);
                    }
                    return courses;
                })()}
            </Grid>
        </div>
    );
}
